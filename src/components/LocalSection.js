import React from "react";
import TestimonialCarousel from './TestimonialCarousel';

const testimonios = [
  {
    name: "Ana Martínez",
    comment: "¡El mejor maracumango que he probado! Atención de 10.",
    stars: 5,
  },
  {
    name: "Carlos Pérez",
    comment: "Productos súper frescos, originales y deliciosos.",
    stars: 5,
  },
  {
    name: "Valentina R.",
    comment: "Me encanta Olè Mita. Todo llega rápido y bien presentado.",
    stars: 5,
  },
];

const LocalSection = () => (
  <section className="py-16 px-4 sm:px-8 bg-gradient-to-tr from-yellow-50 to-orange-100 border-t border-orange-200 animate-fadeIn">
    <h2 className="text-4xl font-extrabold text-center mb-10 text-orange-700 drop-shadow-sm">¿Dónde estamos?</h2>
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center justify-center">
      {/* Mapa */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0 rounded-3xl overflow-hidden shadow-lg border border-orange-200">
<iframe
  title="Ubicación Olè Mita"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1614.3490977664737!2d-72.47763441916682!3d7.884664327641037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6645aa481c3213%3A0x7a91ec553ba08e72!2sAv.%2012%20%2320-3%2C%20C%C3%BAcuta%2C%20Norte%20de%20Santander!5e0!3m2!1ses-419!2sco!4v1752527614664!5m2!1ses-419!2sco"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full h-[350px] rounded-3xl shadow-lg"
/>
      </div>
      {/* Testimonios */}
<div className="w-full lg:w-1/2">
  <h3 className="text-2xl font-bold text-orange-700 mb-6 text-center">Lo que opinan nuestros clientes</h3>
  <TestimonialCarousel />
</div>
    </div>
  </section>
);

export default LocalSection;
