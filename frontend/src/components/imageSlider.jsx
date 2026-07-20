import {useState,useEffect} from 'react'
import 'react'

const images = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1600&q=80",
];

const ImageSlider = () => {
   const [current,setCurrent] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
  };

   return (
  <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
    {/* Images */}
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${current * 100}%)` }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className="w-full h-75 md:h-112.5 object-cover shrink-0"
        />
      ))}
    </div>

    {/* Previous Button */}
    <button
      onClick={previousSlide}
      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition"
    >
      &#10094;
    </button>

    {/* Next Button */}
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition"
    >
      &#10095;
    </button>

    {/* Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`transition-all duration-300 rounded-full ${
            current === index
              ? "w-6 h-2 bg-white"
              : "w-2 h-2 bg-white/60"
          }`}
        />
      ))}
    </div>
  </div>
);
}

export default ImageSlider;