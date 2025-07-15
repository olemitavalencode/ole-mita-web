import React from 'react';

const ShopAboutSection = ({ aboutInfo }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {aboutInfo.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
            {aboutInfo.paragraph1}
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
            {aboutInfo.paragraph2}
          </p>
          <button className="px-6 py-3 sm:px-7 sm:py-3 bg-gray-800 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg hover:bg-black transform hover:scale-105 transition-all duration-300 ease-in-out">
            Conoce Más
          </button>
        </div>
        <div className="lg:w-1/2 relative w-full">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out">
            <img
              src={aboutInfo.image}
              alt="Artesanía Mexicana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-48 sm:h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
          <div className="absolute -top-4 -right-4 w-40 h-40 sm:w-56 sm:h-56 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-5000"></div>
        </div>
      </div>
    </section>
  );
};

export default ShopAboutSection;