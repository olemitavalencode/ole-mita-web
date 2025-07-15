import React, { useState } from 'react';

const CheckoutForm = ({ cartItems, total, onConfirmOrder, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!customerName) newErrors.customerName = 'El nombre es obligatorio.';
    if (!customerEmail) {
      newErrors.customerEmail = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      newErrors.customerEmail = 'El correo electrónico no es válido.';
    }
    if (!customerPhone) newErrors.customerPhone = 'El teléfono es obligatorio.';
    if (!customerAddress) newErrors.customerAddress = 'La dirección es obligatoria.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderDetails = {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        paymentMethod,
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      };
      onConfirmOrder(orderDetails);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
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
          Volver al Carrito
        </button>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Confirmar Pedido
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="customerName" className="block text-lg font-medium text-gray-800 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="customerName"
              className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.customerName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
          </div>
          <div>
            <label htmlFor="customerEmail" className="block text-lg font-medium text-gray-800 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="customerEmail"
              className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.customerEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
          </div>
          <div>
            <label htmlFor="customerPhone" className="block text-lg font-medium text-gray-800 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="customerPhone"
              className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.customerPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
          </div>
          <div>
            <label htmlFor="customerAddress" className="block text-lg font-medium text-gray-800 mb-2">
              Dirección de Envío
            </label>
            <textarea
              id="customerAddress"
              rows="3"
              className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.customerAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            ></textarea>
            {errors.customerAddress && <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>}
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-lg font-medium text-gray-800 mb-2">
              Método de Pago
            </label>
            <select
              id="paymentMethod"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="efectivo">Efectivo a la entrega</option>
            </select>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
            <ul className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between text-lg text-gray-700">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(parseFloat(item.price) * item.quantity).toFixed(2)} MXN</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-2xl font-bold text-gray-900 border-t pt-4">
              <span>Total:</span>
              <span>${total} MXN</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;