import React from 'react';

function formatearPrecioCOP(valor) {
  if (!valor) return '$0';
  return '$' + Number(valor).toLocaleString('es-CO');
}
const ShopCart = ({ cartItems, onBack, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

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
          Volver a la tienda
        </button>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Tu Carrito de Compras
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">Tu carrito está vacío. ¡Añade algunos productos!</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
<p className="text-lg text-orange-600 font-bold">{formatearPrecioCOP(item.price)}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
<div className="text-right text-3xl font-bold text-gray-900 mt-8 border-t pt-4">
  Total: {formatearPrecioCOP(calculateTotal())}
</div>  
          <div className="text-center mt-8">
              <button
                onClick={onProceedToCheckout}
                className="px-8 py-4 bg-green-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopCart;