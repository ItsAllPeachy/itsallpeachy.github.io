import { useEffect } from 'react';
import { useState } from 'react'; 

function DebugMenu(){

    const [ current_page, set_current_page ] = useState(window.location.pathname);
    const [ screen_width, set_screen_width ] = useState(window.innerWidth);
    const [ screen_height, set_screen_height ] = useState(window.innerHeight);
    useEffect(() => {
        const handle_resize = () => {
            set_screen_width(window.innerWidth); 
            set_screen_height(window.innerHeight);
        };
        window.addEventListener("resize", handle_resize); 
        return () => window.removeEventListener("resize", handle_resize); 
    }, [])
    useEffect(() => {
        const handleLocationChange = () => {
            set_current_page(window.location.pathname);
        };
        window.addEventListener('popstate', handleLocationChange);
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            };
    }, []);
    return(
        <div className="fixed flex flex-col left-4 z-50 bg-transparent text-white p-4 rounded-lg shadow-lg">
            <div>devMenu:</div>
            <div className="ml-5">current_page: {current_page};</div>  
            <div className="ml-5">screen_width: {screen_width};</div>                
            <div className="ml-5">screen_height: {screen_height};</div>                
        </div>
    )
}export default DebugMenu;