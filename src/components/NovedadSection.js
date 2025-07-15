import React from "react";

const novedad = {
  nombre: "Chamoyada de Mango",
  imagen: "https://i.imgur.com/XXXXX.png", // Cambia por tu imagen real
  precio: "$18.000",
  historia:
    "¡Acabamos de traer la receta original de Guadalajara! Prueba el sabor auténtico de la chamoyada más refrescante. Solo por tiempo limitado.",
  video: "", // Si quieres un video, pon el embed de Instagram/TikTok aquí
};

const instagramUrl =
  "https://www.instagram.com/olemita.dulcesmexicanos/reels/?hl=en";

const NovedadSection = () => (
  <section className="py-14 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-yellow-50 to-orange-50 mb-12 rounded-3xl shadow-xl max-w-5xl mx-auto">
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <img
        src={novedad.imagen}
        alt={novedad.nombre}
        className="rounded-3xl shadow-lg w-72 h-72 object-cover mb-4"
      />
      {novedad.video && (
        <iframe
          src={novedad.video}
          className="rounded-2xl w-full mt-3"
          height={220}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video de Novedad"
        />
      )}
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
      <span className="text-xl text-pink-600 font-bold mb-1">
        ¿Qué hay de nuevo en Olè Mita?
      </span>
      <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
        {novedad.nombre}{" "}
        <span className="text-orange-500 font-bold">{novedad.precio}</span>
      </h3>
      <p className="text-lg text-gray-700 mb-5">{novedad.historia}</p>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-pink-500 hover:to-orange-500 transition-all text-lg"
      >
        Descúbrelo en Instagram
      </a>
    </div>
  </section>
);

export default NovedadSection;
