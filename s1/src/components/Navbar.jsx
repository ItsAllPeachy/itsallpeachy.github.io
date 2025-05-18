import { useEffect } from 'react';
import { useState } from 'react'; 

//630 
function NavbarPC(){
  const [ current_page, set_current_page ] = useState(window.location.pathname);
  const [ screen_width, set_screen_width ] = useState(window.innerWidth);

  useEffect(() => {
    const handle_resize = () => {
      set_screen_width(window.innerWidth); 
    };
    window.addEventListener("resize", handle_resize); 
    return () => window.removeEventListener("resize", handle_resize); 
  }, [])
  console.log(screen_width);

  useEffect(() => {
    const handleLocationChange = () => {
      set_current_page(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    let active = "";
    if (current_page === "/") {
      active = "btn-home";
    } else if (["/about", "/about/"].includes(current_page)) {
      active = "btn-about";
    } else if (["/projects", "/projects/"].includes(current_page)) {
      active = "btn-projects";
    } else {
      active = "btn-blog";
    }
    const active_button = document.getElementById(active); 
    if (active_button) {
      if(screen_width <= 665){
        active_button.classList.add(
          "text-white",
          "border-b-2", 
          "drop-shadow-[0_0_10px_#38bdf8]",
          "box-border",
          "font-extrabold"
        );
      }else{
        active_button.classList.add(
          "underline", 
          "bg-white", 
          "text-black", 
          "font-extrabold"
        );
      }
    }
  }, [current_page]);
  console.log(current_page)


  const navbarmobile_style = ("flex mx-[0.5rem] text-center p-1 rounded-xs")
  const mobile_navbar = (
    <section className="z-999999 fixed bottom-2 text-white flex justify-center w-full">

      <div id="navbar_center_content"           className="flex items-center text-[#cdd6f4] justify-center bg-black/30 backdrop-blur-md font-semibold rounded-3xl border-2 border-[#333] shadow-md p-2 py-2.5">
        <a href="/"          id="btn-home"      className={navbarmobile_style}> HOME     </a>
        <a href="/about"     id="btn-about"     className={navbarmobile_style}> ABOUT    </a>
        <a href="/blog/"     id="btn-blog"      className={navbarmobile_style}> BLOG     </a>
      </div>
    </section>
  )
  const [open, setOpen] = useState(false)

  const navbarpc_style = ("transition-colors duration-500 ease hover:bg-[#333] bg-black pt-2 pb-2 pr-4 pl-4 rounded-3xl")
  const pc_navbar = (
    <section className="z-2000 mt-2 ">
      <div id="navbar_left_content" >
        <a href="https://linktr.ee/ItsAllPeachy" target="_blank" className={` ${navbarpc_style} font-semibold text-white absolute left-5 rounded-2xl border-2 border-[#333] bg-transparent backdrop-blur-md`}> PEACH </a>
      </div>

      <div className="absolute top-1 right-2 flex gap-2 border-2 border-[#333] p-2 rounded-2xl bg-transparent backdrop-blur-md">
        <a href="https://github.com/ItsAllPeachy" target="_blank" id="btn-github">
          <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 64 64">
            <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
          </svg>
        </a>  
        <a href="https://www.instagram.com/jordang.astro/?hl=en" target="_blank" id="btn-ig" className="flex">
          <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 50 50">
            <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
          </svg>
        </a>
      </div>
      <div id="navbar_center_content"           className="flex justify-center text-white gap-2"> 
        <a href="/"          id="btn-home"      className={`${navbarpc_style} bg-transparent border-2 border-[#080808] backdrop-blur-md`}> HOME </a>
        <a href="/about"     id="btn-about"     className={`${navbarpc_style} bg-transparent border-2 border-[#080808] backdrop-blur-md`}> ABOUT </a>
        <a href="/blog/"     id="btn-blog"      className={`${navbarpc_style} bg-transparent border-2 border-[#080808] backdrop-blur-md`}> BLOG </a>
      </div>
    </section>
  )
  if(screen_width <= 665){
    return mobile_navbar;
  }else{
    return pc_navbar; 
  } 
}



export default NavbarPC; 