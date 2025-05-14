import { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    '/src/assets/langs/c.svg',
    '/src/assets/langs/cpp.svg',
    '/src/assets/langs/docker.svg',
    '/src/assets/langs/favicon.svg',
    '/src/assets/langs/git.svg',
    '/src/assets/langs/javascript.svg',
    '/src/assets/langs/mysql.svg',
    '/src/assets/langs/php.svg',
    '/src/assets/langs/postgresql.svg',
    '/src/assets/langs/python.svg',
    '/src/assets/langs/react.svg',
    '/src/assets/langs/sqlite.svg',
    '/src/assets/langs/typescript.svg',
    '/src/assets/langs/vue.svg',
    '/src/assets/langs/bash.svg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-[160px] h-[160px] flex items-center justify-center border-2 p-4 border-[#cdd6f4] rounded-3xl shadow-[3px_3px_6px_rgba(255,255,255,0.25)]">
      <img className="object-contain" height="128" width="128" id="POES" src={images[currentImageIndex]} alt="image slider" />
    </div>
  );
};

export default ImageSlider;
