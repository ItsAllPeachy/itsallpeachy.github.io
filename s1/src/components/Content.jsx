import { useEffect, useState } from 'react';

function Content() {
  const [current_page, set_current_page] = useState(window.location.pathname);
  const [screen_width, set_screen_width] = useState(window.innerWidth);

  useEffect(() => {
    const handle_resize = () => set_screen_width(window.innerWidth);
    window.addEventListener("resize", handle_resize);
    return () => window.removeEventListener("resize", handle_resize);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => set_current_page(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <section id="z-2000000 component-content" className="flex justify-center items-center min-h-screen px-4 py-8">
      <div id="content-root" className="bg-transparent border-2 border-[#cdd6f4] backdrop-blur-md px-4 sm:px-6 py-6 sm:py-8 rounded-2xl w-full max-w-[94%] md:max-w-[800px] flex flex-col md:flex-row items-center gap-6">
        <div id="content-pfp" className="relative w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px]">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" fill="none" stroke="white" strokeWidth="7" strokeDasharray="40, 20, 60, 30, 50, 20, 70, 40" strokeLinecap="round" />
            <image href="/src/assets/profile.jpeg" x="10" y="10" width="380" height="380" clipPath="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />
            <defs>
              <clipPath id="circleClip">
                <circle cx="200" cy="200" r="190" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="text-white w-full md:w-1/2 text-center space-y-4" id="content-text">
          <h1 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
            About Me
          </h1>
          <p className="text-[clamp(1rem,3.5vw,1.25rem)]">
            I'm a high schooler from South Africa with a passion for programming, reading, and writing. Right now, I'm diving into web development while learning some basic pentesting.
          </p>
          <p className="text-[clamp(1rem,3.5vw,1.25rem)]">
            When I'm not coding, you'll probably find me lost in a book or writing something creative. I like to think of myself as someone with a little whimsy—always curious and excited to learn something new!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Content;
