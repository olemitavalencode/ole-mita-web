import React from 'react';

const faqs = [
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Los envíos suelen tardar de 2 a 5 días hábiles dependiendo de tu ciudad o municipio.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria y efectivo contra entrega.'
  },
  {
    question: '¿Cómo puedo realizar un pedido?',
    answer: 'Simplemente selecciona tus productos favoritos, agrégalos al carrito y completa el formulario de compra.'
  },
  {
    question: '¿Dónde puedo contactar si tengo un problema?',
    answer: 'Puedes escribirnos a info@olemita.com o al WhatsApp +52 55 1234 5678.'
  },
  {
    question: '¿Puedo devolver un producto?',
    answer: 'Sí, tienes hasta 7 días hábiles después de recibir tu pedido para solicitar una devolución. Consulta nuestras políticas para más detalles.'
  }
];

const ShopFaqSection = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-yellow-50 min-h-screen">
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">Preguntas Frecuentes</h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ShopFaqSection;
