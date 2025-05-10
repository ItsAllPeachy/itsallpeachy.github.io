import { useEffect, useState } from 'react';

function Content() {
  const [current_page, set_current_page] = useState(window.location.pathname);
  const [screen_width, set_screen_width] = useState(window.innerWidth);

  useEffect(() => {
    const handle_resize = () => {
      set_screen_width(window.innerWidth);
    };
    window.addEventListener("resize", handle_resize);
    return () => window.removeEventListener("resize", handle_resize);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      set_current_page(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const TextContent = (
      <section id="z-2000000 component-content" className="flex justify-center items-center h-screen">
        <div id="content-root" className="bg-transparent border-2 border-[#080808] backdrop-blur-md p-8 rounded-2xl w-[800px] h-[400px] flex items-center flex-nowrap">
          <div className="text-white w-1/2" id="content-text">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text">About Me</h1>
            <p>
              I'm a high schooler from South Africa with a passion for programming, reading, and writing. Right now, I'm diving into web development while learning some basic pentesting.
            </p>
            <p className="mt-5">
              When I'm not coding, you'll probably find me lost in a book or writing something creative. I like to think of myself as someone with a little whimsy—always curious and excited to learn something new!
            </p>
          </div>
          <div id="content-pfp" className="relative w-1/2 h-[400px]">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="190" fill="none" stroke="white" strokeWidth="7" strokeDasharray="40, 20, 60, 30, 50, 20, 70, 40" strokeLinecap="round" />
              <image href="/src/assets/profile.jpeg" x="10" y="10" width="380" height="380" clipPath="url(#circleClip)" />
              <defs>
                <clipPath id="circleClip">
                  <circle cx="200" cy="200" r="190" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    );
  return TextContent;
}

export default Content;
