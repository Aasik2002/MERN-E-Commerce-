import { useState, useEffect } from 'react'

const images = [
  // Modern E-commerce / Tech Gadgets
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
  // Fashion & Apparel Shopping
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  // Smart Home / Lifestyle Devices
  "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1600&q=80",
  // Trendy Shopping Bags / Retail Experience
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
  // Premium Electronics & Accessories
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
];

const ImageSlider = () => {
   const [current, setCurrent] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
  };

   return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40 border border-slate-800 bg-slate-900">
      {/* Images Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-72 sm:h-96 lg:h-[450px] shrink-0 relative">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for modern UI contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-black/30 cursor-pointer"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-black/30 cursor-pointer"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800/80 shadow-inner">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              current === index
                ? "w-7 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md shadow-blue-500/50"
                : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;