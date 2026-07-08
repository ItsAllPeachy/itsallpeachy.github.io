import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

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
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.wpadmngr.com"],
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

app.use('/api/', apiLimiter);
app.use('/api/comments/', postLimiter);

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

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
