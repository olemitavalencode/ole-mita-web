import React from 'react';

const ShopContactSection = ({ contactInfo }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
          ¿Tienes Preguntas? ¡Contáctanos!
        </h2>
        <p className="text-base sm:text-lg text-gray-700">
          Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos a la brevedad.
        </p>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 relative">
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 text-base sm:text-lg"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 text-base sm:text-lg"
              placeholder="tu.correo@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
              Tu Mensaje
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 text-base sm:text-lg resize-none"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 sm:py-4 bg-orange-600 text-white text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Enviar Mensaje
          </button>
        </form>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-40 sm:h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-3xl mx-auto mt-10 text-center text-gray-700">
        <p className="text-lg font-semibold">Información de Contacto:</p>
        <p className="text-base">Email: {contactInfo.email}</p>
        <p className="text-base">Teléfono: {contactInfo.phone}</p>
      </div>
    </section>
  );
};

export default ShopContactSection;