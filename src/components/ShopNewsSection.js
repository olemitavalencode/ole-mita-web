import React from 'react';

const ShopNewsSection = () => {
  // Puedes personalizar las noticias o dejar estos ejemplos
  const newsItems = [
    {
      id: 1,
      title: '¡Nuevos productos de Oaxaca!',
      date: '15 de Mayo, 2024',
      description: 'Hemos añadido una increíble selección de artesanías y productos gastronómicos directamente desde Oaxaca. ¡No te los pierdas!',
      image: 'https://via.placeholder.com/300x200/FF6347/FFFFFF?text=OaxacaNews',
    },
    {
      id: 2,
      title: 'Descuentos especiales en textiles',
      date: '10 de Mayo, 2024',
      description: 'Aprovecha nuestros descuentos por tiempo limitado en todos los textiles bordados a mano. ¡Dale un toque mexicano a tu hogar!',
      image: 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=TextileNews',
    },
    {
      id: 3,
      title: 'Olè Mita en el Festival Cultural',
      date: '05 de Mayo, 2024',
      description: 'Estaremos presentes en el Festival Cultural de la Ciudad de México. ¡Visita nuestro stand y conoce a los artesanos!',
      image: 'https://via.placeholder.com/300x200/32CD32/FFFFFF?text=FestivalNews',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-10 sm:mb-12">
          Últimas Novedades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">{item.date}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">{item.description}</p>
                <button className="text-orange-600 font-semibold hover:underline text-base sm:text-lg">
                  Leer más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopNewsSection;
