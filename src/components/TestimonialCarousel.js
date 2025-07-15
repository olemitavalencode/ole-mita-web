import React, { useEffect, useState, useRef } from "react";

const testimonios = [
  { name: "Ana Martínez", comment: "¡El mejor maracumango que he probado! Atención de 10.", stars: 5 },
  { name: "Carlos Pérez", comment: "Productos súper frescos, originales y deliciosos.", stars: 5 },
  { name: "Valentina R.", comment: "Me encanta Olè Mita. Todo llega rápido y bien presentado.", stars: 5 },
  { name: "Daniela M.", comment: "Experiencia increíble, todo delicioso.", stars: 5 },
  { name: "Juan C.", comment: "Muy recomendados, variedad y calidad.", stars: 4 },
  { name: "Camila S.", comment: "Lo mejor para antojos mexicanos en Cúcuta.", stars: 5 },
  { name: "Andrés F.", comment: "Sabor mexicano real y excelente atención.", stars: 5 },
  { name: "Patricia L.", comment: "Repetiré seguro, todo delicioso.", stars: 5 },
  { name: "Lucas M.", comment: "Buenos precios y calidad en los productos.", stars: 4 },
  { name: "Mónica G.", comment: "La presentación es hermosa, recomendados.", stars: 5 },
  { name: "Diego T.", comment: "Rápido, delicioso y con excelente atención.", stars: 5 },
{ name: "Elena P.", comment: "Una explosión de sabores mexicanos, ¡me encanta!", stars: 5 },
{ name: "Sofía U.", comment: "Nunca había probado algo así, superó mis expectativas.", stars: 5 },
{ name: "Martín Z.", comment: "Muy buenos precios para tanta calidad.", stars: 4 },
{ name: "Luisa G.", comment: "Siempre sorprenden con algo nuevo. ¡Amo los postres!", stars: 5 },
{ name: "Ricardo D.", comment: "Un antojo satisfecho cada vez que pido.", stars: 5 },
{ name: "Paula S.", comment: "El chamoy más rico de Cúcuta.", stars: 5 },
{ name: "Julio V.", comment: "Súper recomendado para eventos y reuniones.", stars: 5 },
{ name: "Verónica E.", comment: "Gran variedad y todo muy fresco.", stars: 4 },
{ name: "Felipe R.", comment: "Nunca fallan, siempre cumplen con mi pedido.", stars: 5 },
{ name: "Diana B.", comment: "Pedí para mis hijos y quedaron felices.", stars: 5 },
{ name: "Manuel J.", comment: "El mejor lugar para dulces típicos mexicanos.", stars: 5 },
{ name: "Isabela F.", comment: "Excelente atención, muy detallistas con los pedidos.", stars: 5 },
{ name: "Marcos Q.", comment: "El maracumango es un vicio, no lo cambio por nada.", stars: 5 },
{ name: "Tatiana W.", comment: "Llegó rápido y todo perfecto.", stars: 5 },
{ name: "Pedro N.", comment: "Prueben el mango biche con chamoy, una delicia.", stars: 5 },
{ name: "Sandra O.", comment: "La mejor experiencia online con dulces.", stars: 5 },
{ name: "Alejandro M.", comment: "Tienda top, todo el mundo debería probar Olè Mita.", stars: 5 },
{ name: "Clara S.", comment: "Los recomiendo a ojos cerrados, ¡gracias por el antojo!", stars: 5 },
{ name: "Julián P.", comment: "Siempre innovando y el sabor nunca decepciona.", stars: 5 },

  // ... agrega hasta 30 o los que quieras
];

const VISIBLE_COMMENTS = 3; // ¿Cuántos mostrar a la vez?
const AUTO_SCROLL_TIME = 3500; // ms

const TestimonialCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStartIndex(prev =>
        prev + 1 >= testimonios.length ? 0 : prev + 1
      );
    }, AUTO_SCROLL_TIME);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Mostrar los N testimonios consecutivos (con loop infinito)
  const displayed = [];
  for (let i = 0; i < VISIBLE_COMMENTS; i++) {
    displayed.push(testimonios[(startIndex + i) % testimonios.length]);
  }

  return (
    <div className="space-y-6 min-h-[420px] transition-all duration-500">
      {displayed.map((t, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-5 border-l-8 border-orange-400 animate-fadeIn"
        >
          <div className="flex items-center mb-2">
            {Array.from({ length: t.stars }).map((_, idx) => (
              <span key={idx} className="text-yellow-400 text-xl">★</span>
            ))}
            <span className="ml-3 text-gray-800 font-semibold">{t.name}</span>
          </div>
          <p className="text-gray-700 italic">“{t.comment}”</p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCarousel;
