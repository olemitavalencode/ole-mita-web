import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function formatearPrecioCOP(valor) {
  if (!valor) return '$0';
  return '$' + Number(valor).toLocaleString('es-CO');
}
const ShopNovedadesCarousel = ({ onAddToCart }) => {
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const fetchNovedades = async () => {
      const querySnapshot = await getDocs(collection(db, "novedades"));
      setNovedades(
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchNovedades();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,      // SOLO UNA novedad visible a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,  // Cambia cada 4 segundos
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true
  };

  if (!novedades.length) return null;

  return (
    <section className="py-8 flex justify-center">
      <div className="w-full max-w-3xl px-2">
        <Slider {...settings}>
          {novedades.map(n => (
            <div key={n.id}>
              <div className="bg-orange-50 rounded-3xl shadow-xl px-7 py-8 flex flex-col md:flex-row items-center gap-8">
                <img
                  src={n.imagenUrl}
                  alt={n.nombre}
                  className="rounded-2xl shadow-md w-44 h-44 object-cover"
                />
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-lg text-pink-600 font-bold mb-1">¿Qué hay de nuevo en Olè Mita?</span>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                    {n.nombre} <span className="text-orange-500 font-bold">{formatearPrecioCOP(n.precio)}</span>

                  </h3>
                  <p className="text-gray-700 mb-4">{n.descripcion}</p>
                  <div className="flex gap-3">
                    <button
                      className="px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow hover:from-pink-500 hover:to-orange-500 transition-all"
                      onClick={() => onAddToCart && onAddToCart(n)}
                    >
                      Agregar al carrito
                    </button>
                    {n.instagramUrl && n.instagramUrl.trim() !== "" && (
                      <a
                        href={n.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-full shadow hover:from-orange-500 hover:to-pink-500 transition-all"
                      >
                        Descúbrelo en Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ShopNovedadesCarousel;
