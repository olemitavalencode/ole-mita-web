import React from 'react';

const WelcomeSection = ({ bannerText, onExploreProducts }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 text-center">
      <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {bannerText.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8">
          {bannerText.subtitle}
        </p>
        <button
          onClick={onExploreProducts}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Explorar Productos
        </button>
      </div>
    </section>
  );
};

export default WelcomeSection;