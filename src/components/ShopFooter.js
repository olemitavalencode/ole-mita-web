import React from 'react';

const ShopFooter = ({ onNavigate, contactInfo }) => {  return (
    <footer className="bg-gradient-to-br from-orange-600 via-pink-500 to-yellow-400 text-gray-100 py-12 px-4 sm:px-8 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg tracking-wide">Olè Mita</h3>
          <p className="text-base text-gray-200 mb-6">
            Llevando la tradición y el sabor de México a tu hogar.
          </p>
          <div className="flex gap-3">
            <span className="inline-block bg-green-600 rounded-full px-4 py-1 text-xs font-bold shadow-lg">
              🇲🇽 Hecho en México
            </span>
            <span className="inline-block bg-blue-500 rounded-full px-4 py-1 text-xs font-bold shadow-lg">
              🔒 Pago Seguro
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-base">
            <li><button onClick={() => onNavigate('home')} className="hover:text-yellow-200 transition bg-transparent border-0 p-0 m-0 text-inherit">Inicio</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-yellow-200 transition bg-transparent border-0 p-0 m-0 text-inherit">Tienda</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-yellow-200 transition bg-transparent border-0 p-0 m-0 text-inherit">Nosotros</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-yellow-200 transition bg-transparent border-0 p-0 m-0 text-inherit">Contacto</button></li>
            <li><button onClick={() => onNavigate('news')} className="hover:text-yellow-200 transition bg-transparent border-0 p-0 m-0 text-inherit">Novedades</button></li>
          </ul>
        </div>
<div>
  <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
  <p className="text-base text-gray-100">
    Email: {contactInfo?.email || "info@olemita.com"}
  </p>
  <p className="text-base text-gray-100">
    Teléfono: {contactInfo?.phone || "+52 55 1234 5678"}
  </p>
  <div className="flex gap-5 mt-5">
    {/* Facebook */}
    <a
      href="https://web.facebook.com/ole.mita04/?_rdc=1&_rdr#"
      className="text-white hover:text-blue-400 transition"
      aria-label="Facebook"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Icono moderno Facebook */}
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.462.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    </a>
    {/* Instagram */}
    <a
      href="https://www.instagram.com/olemita.dulcesmexicanos/reels/?hl=en"
      className="text-white hover:text-pink-400 transition"
      aria-label="Instagram"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Icono moderno Instagram */}
  <svg
    width="32"
    height="32"
    viewBox="0 0 448 448"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <defs>
      <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%" fx="10%" fy="94%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="448" height="448" rx="90" fill="url(#instagram-gradient)" />
    <circle cx="224" cy="224" r="70" stroke="white" strokeWidth="40" fill="none" />
    <circle cx="336" cy="112" r="14" fill="white" />
  </svg>    </a>
  </div>
</div>
      </div>
      <div className="text-center text-gray-50 mt-12 border-t border-white/30 pt-8 text-lg drop-shadow-md">
        © {new Date().getFullYear()} Olè Mita. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default ShopFooter;
