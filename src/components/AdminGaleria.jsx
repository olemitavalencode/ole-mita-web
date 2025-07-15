import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const AdminGaleria = () => {
  const [imagenes, setImagenes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchGaleria = async () => {
      const querySnapshot = await getDocs(collection(db, "galeria"));
      setImagenes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchGaleria();
  }, []);

  const handleUpload = async () => {
    if (!url || !/\.(jpg|jpeg|png|webp|gif)$/i.test(url)) {
      alert("Pega una URL de imagen válida (.jpg, .jpeg, .png, .webp, .gif)");
      return;
    }
    setUploading(true);
    await addDoc(collection(db, "galeria"), {
      url: url.trim(),
      titulo: titulo.trim()
    });

    // Refresca galería
    const querySnapshot = await getDocs(collection(db, "galeria"));
    setImagenes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setTitulo("");
    setUrl("");
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar imagen?")) {
      await deleteDoc(doc(db, "galeria", id));
      setImagenes(imagenes.filter(img => img.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-sm">Gestionar Galería Instagram</h2>
      <div className="bg-white p-5 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Pega aquí la URL de la imagen (.jpg, .png, .webp...)"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="border border-orange-300 p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
        />
        <input
          type="text"
          placeholder="Título (opcional)"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="border border-orange-200 p-3 rounded-xl flex-1 focus:outline-none text-lg"
        />
        <button
          onClick={handleUpload}
          className={`bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 hover:from-pink-500 hover:to-orange-500 transition-all duration-200 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={uploading}
        >
          {uploading ? "Agregando..." : "Agregar Imagen"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {imagenes.map(img => (
          <div
            key={img.id}
            className="relative rounded-2xl overflow-hidden shadow-xl group transition-transform duration-300 hover:scale-105 bg-white"
            style={{ minHeight: 170 }}
          >
            <img
              src={img.url}
              alt={img.titulo || "Imagen Galería"}
              className="object-cover w-full h-44 group-hover:brightness-90 transition-all"
              style={{ borderRadius: "1rem 1rem 0 0" }}
              onError={e => { e.target.src = "https://i.imgur.com/PMKpT2U.png"; }}
            />
            {img.titulo && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-center p-2 font-semibold text-md rounded-b-2xl">
                {img.titulo}
              </div>
            )}
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-80 hover:opacity-100 shadow-lg transition"
              onClick={() => handleDelete(img.id)}
              title="Eliminar imagen"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGaleria;
