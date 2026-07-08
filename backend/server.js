import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Database from 'better-sqlite3';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || crypto.randomBytes(32).toString('hex');

const db = new Database(path.join(__dirname, 'comments.db'));
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  parent_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.set('x-powered-by', false);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const postLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many comments, please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many admin requests.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/admin/', adminLimiter);
app.use('/api/comments/', postLimiter);
app.use('/api/', apiLimiter);

function auth(req, res, next) {
  const key = req.headers['authorization']?.replace('Bearer ', '');
  if (!key || key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function constantTimeCompare(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

app.get('/api/comments/:postId', (req, res) => {
  try {
    const comments = db.prepare(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC'
    ).all(req.params.postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.post('/api/comments/:postId', (req, res) => {
  try {
    const { author, body, parent_id } = req.body;
    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'body is required' });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ error: 'author is required' });
    }
    const sanitizedAuthor = author.trim().slice(0, 100);
    const sanitizedBody = body.trim().slice(0, 5000);

    const result = db.prepare(
      'INSERT INTO comments (post_id, author, body, parent_id) VALUES (?, ?, ?, ?)'
    ).run(req.params.postId, sanitizedAuthor, sanitizedBody, parent_id || null);

    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

app.get('/admin/api/posts', auth, (req, res) => {
  try {
    const posts = db.prepare(
      'SELECT post_id, COUNT(*) as count FROM comments GROUP BY post_id ORDER BY post_id'
    ).all();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/admin/api/comments', auth, (req, res) => {
  try {
    const { post_id } = req.query;
    let comments;
    if (post_id) {
      comments = db.prepare(
        'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC'
      ).all(post_id);
    } else {
      comments = db.prepare(
        'SELECT * FROM comments ORDER BY created_at DESC'
      ).all();
    }
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.delete('/admin/api/comments/:id', auth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid comment ID' });
    }
    const result = db.prepare('DELETE FROM comments WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    db.prepare('DELETE FROM comments WHERE parent_id = ?').run(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

app.get('/admin', (req, res) => {
  const key = req.query.key;
  if (!key || !constantTimeCompare(key, ADMIN_KEY)) {
    return res.status(401).send('Unauthorized');
  }

  const nonce = crypto.randomBytes(16).toString('base64');
  res.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'nonce-" + nonce + "'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>admin // itsallpeachy</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#c8c8c8;font-family:monospace;padding:2rem}
h1{color:#00ff41;font-size:1.2rem;margin-bottom:.5rem}
h1 span{color:#8a8a8a}
.sub{color:#8a8a8a;font-size:.75rem;margin-bottom:2rem}
.post-group{border:1px solid #1a1a1a;border-radius:4px;margin-bottom:1.5rem}
.post-header{background:#111;padding:.75rem 1rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
.post-header:hover{background:#181818}
.post-header .title{color:#00ff41;font-size:.85rem}
.post-header .count{color:#8a8a8a;font-size:.75rem}
.post-header .arrow{color:#555;transition:transform .2s}
.post-header.open .arrow{transform:rotate(90deg)}
.comment-list{display:none}
.comment-list.open{display:block}
.comment{border-top:1px solid #1a1a1a;padding:.75rem 1rem;font-size:.8rem}
.comment .meta{color:#8a8a8a;margin-bottom:.25rem;font-size:.7rem}
.comment .meta .author{color:#00ff41}
.comment .meta .id{color:#555}
.comment .body{color:#c8c8c8;line-height:1.4;word-break:break-word}
.comment .parent-badge{display:inline-block;font-size:.65rem;color:#ff8c00;border:1px solid #ff8c00;border-radius:2px;padding:0 4px;margin-left:4px}
.btn-del{background:none;border:1px solid #8a0000;color:#ff4444;padding:2px 8px;cursor:pointer;font-family:monospace;font-size:.7rem;border-radius:2px;float:right;margin-top:2px}
.btn-del:hover{background:#8a0000;color:#fff}
.empty{color:#555;font-size:.8rem;padding:2rem;text-align:center;font-style:italic}
.toast{position:fixed;bottom:1rem;right:1rem;background:#111;border:1px solid #1a1a1a;padding:.5rem 1rem;font-size:.75rem;border-radius:4px;opacity:0;transition:opacity .3s;z-index:100}
.toast.show{opacity:1}
.toast.error{border-color:#8a0000;color:#ff4444}
.toast.success{border-color:#005a00;color:#00ff41}
.loading{color:#555;text-align:center;padding:2rem;font-style:italic}
#logout{color:#8a8a8a;font-size:.7rem;text-decoration:none;margin-left:1rem}
#logout:hover{color:#ff4444}
@media(max-width:600px){body{padding:1rem}.comment{padding:.5rem}}
</style>
</head>
<body>
<h1>> admin <span>//</span> comments</h1>
<div class="sub"><span id="key-display">key: ${ADMIN_KEY.slice(0,8)}...</span> <a id="logout" href="#">[ logout ]</a></div>
<div id="app"><div class="loading">loading comments...</div></div>
<div id="toast" class="toast"></div>
<script nonce="${nonce}">
const KEY = ${JSON.stringify(key)};
const toast = (msg, type) => {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast ' + type + ' show';
  setTimeout(() => el.classList.remove('show'), 3000);
};
const esc = s => {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
};

async function loadPosts() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loading">loading comments...</div>';
  try {
    const [postsRes, commentsRes] = await Promise.all([
      fetch('/admin/api/posts', { headers: { 'Authorization': 'Bearer ' + KEY } }),
      fetch('/admin/api/comments', { headers: { 'Authorization': 'Bearer ' + KEY } })
    ]);
    if (!postsRes.ok || !commentsRes.ok) throw new Error('auth failed');
    const posts = await postsRes.json();
    const allComments = await commentsRes.json();
    const commentsByPost = {};
    allComments.forEach(c => {
      if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
      commentsByPost[c.post_id].push(c);
    });
    render(posts, commentsByPost);
  } catch (e) {
    app.innerHTML = '<div class="empty">failed to load — check admin key</div>';
  }
}

function render(posts, commentsByPost) {
  const app = document.getElementById('app');
  if (posts.length === 0) {
    app.innerHTML = '<div class="empty">no comments yet</div>';
    return;
  }
  app.innerHTML = posts.map(p => {
    const comments = commentsByPost[p.post_id] || [];
    return '<div class="post-group">' +
      '<div class="post-header" onclick="togglePost(this)">' +
        '<span class="title">' + esc(p.post_id) + '</span>' +
        '<span><span class="count">' + p.count + ' comments</span> <span class="arrow">></span></span>' +
      '</div>' +
      '<div class="comment-list">' +
        comments.map(c => renderComment(c)).join('') +
      '</div>' +
    '</div>';
  }).join('');
}

function renderComment(c) {
  const date = c.created_at ? new Date(c.created_at + 'Z').toLocaleString() : 'unknown';
  return '<div class="comment" id="comment-' + c.id + '">' +
    '<button class="btn-del" onclick="deleteComment(' + c.id + ')">[x]</button>' +
    '<div class="meta">' +
      '<span class="id">#' + c.id + '</span> ' +
      '<span class="author">' + esc(c.author) + '</span>' +
      (c.parent_id ? '<span class="parent-badge">reply to #' + c.parent_id + '</span>' : '') +
      ' <span>' + date + '</span>' +
    '</div>' +
    '<div class="body">' + esc(c.body) + '</div>' +
  '</div>';
}

function togglePost(el) {
  el.classList.toggle('open');
  const list = el.nextElementSibling;
  list.classList.toggle('open');
}

async function deleteComment(id) {
  if (!confirm('delete comment #' + id + '?')) return;
  try {
    const res = await       fetch('/admin/api/comments/' + id, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + KEY }
    });
    if (!res.ok) throw new Error('delete failed');
    const el = document.getElementById('comment-' + id);
    if (el) el.remove();
    toast('comment #' + id + ' deleted', 'success');
  } catch (e) {
    toast('failed to delete #' + id, 'error');
  }
}

document.getElementById('logout').addEventListener('click', e => {
  e.preventDefault();
  window.location.href = '/admin?key=' + encodeURIComponent(prompt('enter admin key:'));
});

loadPosts();
</script>
</body>
</html>`;
  res.type('html').send(html);
});

if (!process.env.ADMIN_KEY) {
  console.log('WARNING: No ADMIN_KEY set. Generated random key: ' + ADMIN_KEY);
  console.log('Set ADMIN_KEY environment variable for persistence.');
}

app.listen(PORT, () => console.log('API running on port ' + PORT));
