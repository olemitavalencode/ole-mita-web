import React, { useState } from 'react';

function formatearPrecioCOP(valor) {
  if (!valor) return '$0';
  return '$' + Number(valor).toLocaleString('es-CO');
}
const ShopProductDetail = ({ product, onBack, onAddToCart }) => {
  const [mainImage, setMainImage] = useState(product.image);

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-2xl text-gray-700">Producto no encontrado.</p>
        <button
          onClick={onBack}
          className="ml-4 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors duration-300"
        >
          Volver a la tienda
        </button>
      </section>
    );
  }

  // Mock de imágenes adicionales para el producto
  const additionalImages = [
    product.image,
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-black transition-colors duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg mb-4"
            />
            <div className="grid grid-cols-3 gap-4">
              {additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>
<p className="text-3xl text-orange-600 font-bold mb-6">{formatearPrecioCOP(product.price)}</p>
            <p className="text-lg text-gray-700 mb-4">
              Categoría: <span className="font-semibold">{product.category}</span>
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Este {product.name} es un producto artesanal único, elaborado con los mejores ingredientes/materiales de México. Su sabor/diseño auténtico refleja la rica cultura y tradición de nuestra tierra. Ideal para [uso del producto].
            </p>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-4 bg-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopProductDetail;