import React, { useState } from 'react';

const ShopHeader = ({ onNavigate, onSearch, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md z-50 shadow-lg p-4 flex flex-wrap justify-between items-center transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="text-2xl font-bold text-gray-800">Olè Mita</div>
        <div className="flex items-center md:hidden">
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          <button
            onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Inicio
          </button>
          <button
            onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Tienda
          </button>
          <button
            onClick={() => { onNavigate('about'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Nosotros
          </button>
          <button
            onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Contacto
          </button>
          <button
            onClick={() => { onNavigate('news'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Novedades
          </button>
          <button
            onClick={() => { onNavigate('faq'); setIsMenuOpen(false); }}
            className="text-gray-700 hover:text-black transition-colors duration-200 text-lg font-medium text-left py-2 md:py-0"
          >
            Preguntas Frecuentes
          </button>
        </div>
        <div className="relative flex items-center mt-4 md:mt-0 md:ml-6 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 text-gray-700 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-0 top-0 bottom-0 mr-1 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </nav>
      <button
        onClick={() => onNavigate('cart')}
        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 hidden md:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {cartItemCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default ShopHeader;