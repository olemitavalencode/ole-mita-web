import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const instagramUrl = "https://www.instagram.com/olemita.dulcesmexicanos/reels/?hl=en";

function getYouTubeEmbed(url) {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  if (url.includes("/shorts/")) return url.replace("/shorts/", "/embed/");
  return url;
}

const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGaleria = async () => {
      const querySnapshot = await getDocs(collection(db, "galeria"));
      const galeriaArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).reverse();
      setImages(galeriaArray);
    };
    fetchGaleria();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-yellow-50 text-center">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-10 drop-shadow-lg tracking-tight relative inline-block">
        <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent">Momentos Olè Mita</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
{images.map((img, idx) => (
  <div
    key={img.id || idx}
    className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
    style={{ animationDelay: `${idx * 80}ms` }}
    onClick={() => setSelectedImg(img.url)}
  >
    <img
      src={img.url}
      alt={img.titulo || `ole mita galería ${idx + 1}`}
      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
    />
  </div>
))}
      </div>
      {/* MODAL para ver imagen ampliada */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)}
          style={{ cursor: "zoom-out" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              maxHeight: "98vh",
              maxWidth: "98vw",
              padding: "2rem",
              background: "white",
              borderRadius: "2.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.28)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="momento Olè Mita"
              className="transition-transform duration-300 cursor-zoom-in"
              style={{
                maxHeight: "90vh",
                maxWidth: "90vw",
                minWidth: "300px",
                minHeight: "300px",
                objectFit: "contain",
                borderRadius: "2rem"
              }}
              onMouseMove={e => {
                const img = e.target;
                const { left, top, width, height } = img.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                img.style.transform = `scale(1.7) translate(-${x - 50}%, -${y - 50}%)`;
              }}
              onMouseLeave={e => {
                e.target.style.transform = "scale(1)";
              }}
            />
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-2 right-2 bg-black bg-opacity-40 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl hover:bg-opacity-80 transition"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Botón Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-10 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:from-pink-500 hover:to-orange-500 transition-all text-2xl"
      >
        <span className="flex items-center gap-3 justify-center">
          <svg className="w-7 h-7 mr-1" fill="white" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.8.248 2.23.415.56.217.96.476 1.38.898.42.42.682.818.898 1.38.166.43.36 1.06.416 2.23.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.8-.416 2.23a3.45 3.45 0 01-.898 1.38c-.42.42-.82.681-1.38.898-.43.167-1.06.36-2.23.416-1.266.058-1.65.07-4.85.07s-3.58-.012-4.85-.07c-1.17-.056-1.8-.25-2.23-.416a3.46 3.46 0 01-1.38-.898 3.46 3.46 0 01-.898-1.38c-.167-.43-.36-1.06-.416-2.23C2.212 15.784 2.2 15.404 2.2 12.2s.012-3.584.07-4.85c.056-1.17.25-1.8.416-2.23a3.46 3.46 0 01.898-1.38 3.45 3.45 0 011.38-.898c.43-.167 1.06-.36 2.23-.416C8.416 2.212 8.796 2.2 12 2.2zm0 1.6c-3.175 0-3.555.012-4.805.07-.885.04-1.36.177-1.68.296-.424.156-.725.343-1.05.668a2.22 2.22 0 00-.668 1.05c-.12.32-.257.795-.296 1.68-.058 1.25-.07 1.63-.07 4.805s.012 3.555.07 4.805c.04.885.177 1.36.296 1.68.156.424.344.725.668 1.05.325.324.626.512 1.05.668.32.119.795.257 1.68.296 1.25.058 1.63.07 4.805.07s3.555-.012 4.805-.07c.885-.04 1.36-.177 1.68-.296.424-.156.725-.344 1.05-.668.324-.325.512-.626.668-1.05.119-.32.257-.795.296-1.68.058-1.25.07-1.63.07-4.805s-.012-3.555-.07-4.805c-.04-.885-.177-1.36-.296-1.68a2.21 2.21 0 00-.668-1.05 2.21 2.21 0 00-1.05-.668c-.32-.119-.795-.257-1.68-.296-1.25-.058-1.63-.07-4.805-.07zm0 3.3a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm0 1.6a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm6.1-1.05a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z"/></svg>
          Ver más en Instagram
        </span>
      </a>
    </section>
  );
};

export default GallerySection;
