import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function formatearPrecioCOP(valor) {
  if (typeof valor === "string") valor = Number(valor);
  return "$" + valor.toLocaleString("es-CO");
}

// Flechas modernas y grandes
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 md:right-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-600 text-orange-500 hover:text-white rounded-full shadow-2xl p-4 text-4xl transition-all border-2 border-orange-200"
      onClick={onClick}
      aria-label="Siguiente"
      style={{ outline: 'none' }}
    >›</button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 md:left-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-600 text-orange-500 hover:text-white rounded-full shadow-2xl p-4 text-4xl transition-all border-2 border-orange-200"
      onClick={onClick}
      aria-label="Anterior"
      style={{ outline: 'none' }}
    >‹</button>
  );
}

// Personaliza los dots en CSS global (App.css o index.css):
/*
.slick-dots li button:before {
  font-size: 18px !important;
  color: #fb923c !important;
  opacity: 0.5 !important;
}
.slick-dots li.slick-active button:before {
  color: #ea580c !important;
  opacity: 1 !important;
}
*/

const ShopProductGrid = ({ products, onViewDetails }) => {
  const settings = {
    dots: true,
    infinite: products.length > 6,  // (Mejor que >5 para 6)
    speed: 550,
    slidesToShow: 6,  // <--- AQUÍ va el cambio
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6 } }, // XL y mayores
      { breakpoint: 1280, settings: { slidesToShow: 5 } }, // LG
      { breakpoint: 1024, settings: { slidesToShow: 4 } }, // MD
      { breakpoint: 800,  settings: { slidesToShow: 2 } }, // SM
      { breakpoint: 640,  settings: { slidesToShow: 1 } }  // XS
    ]
  };

  return (
    <section className="py-12 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 relative">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-10 sm:mb-12 drop-shadow-md tracking-tight">
        Nuestros Productos Estrella
      </h2>
<div className="relative w-full max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-10 pb-6">
        <Slider {...settings}>
{products.map((product, i) => (
  <div
    key={product.id}
    className="px-2 py-3"
    style={{ animationDelay: `${i * 70}ms` }}
  >
  <div className="bg-white rounded-3xl shadow-xl group hover:shadow-2xl transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2 hover:scale-105 cursor-pointer animate-fadeIn">    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 sm:h-64 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-110"
      />
      {(product.nuevo || product.masVendido) && (
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md
          ${product.nuevo ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
          {product.nuevo ? "NUEVO" : "DESTACADO"}
        </span>
      )}
    </div>
    <div className="p-4 flex flex-col gap-2 items-center">
      <h3 className="text-2xl font-bold text-gray-800 text-center line-clamp-1">{product.name}</h3>
<p className="text-xl font-bold text-orange-600 text-center">
  {formatearPrecioCOP(product.price)}
</p>
<button
  className="w-full py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:from-pink-500 hover:to-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
  onClick={() => onViewDetails(product)}
>
  Ver Detalles
</button>
    </div>
  </div>
</div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ShopProductGrid;
