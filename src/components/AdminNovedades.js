import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Asegúrate que el path es correcto
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; // <-- AGREGA updateDoc aquí

const AdminNovedades = () => {
  const [novedades, setNovedades] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    imagenUrl: "",
    precio: "",
    descripcion: "",
    instagramUrl: "",
  });

  // Estados para edición
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    precio: "",
    imagenUrl: "",
    descripcion: "",
    instagramUrl: "",
  });

  // Cargar novedades existentes
  useEffect(() => {
    const fetchNovedades = async () => {
      const querySnapshot = await getDocs(collection(db, "novedades"));
      setNovedades(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchNovedades();
  }, []);

  // Manejar cambios de campos (nuevo)
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar novedad (solo con URL de imagen por ahora)
  const handleSubmit = async e => {
    e.preventDefault();
    const precioNumber = Number(form.precio);
    if (isNaN(precioNumber)) {
      alert("El precio debe ser un número válido");
      return;
    }
    await addDoc(collection(db, "novedades"), {
      ...form,
      precio: precioNumber,
    });
    setForm({
      nombre: "",
      imagenUrl: "",
      precio: "",
      descripcion: "",
      instagramUrl: "",
    });
    // Actualizar lista
    const querySnapshot = await getDocs(collection(db, "novedades"));
    setNovedades(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Eliminar novedad
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "novedades", id));
    setNovedades(novedades.filter(n => n.id !== id));
  };

  // Actualizar novedad en Firestore
  const handleUpdate = async (id, editForm) => {
    const precioNumber = Number(editForm.precio);
    if (isNaN(precioNumber)) {
      alert("El precio debe ser un número válido");
      return;
    }
    // Actualiza en Firestore
    const ref = doc(db, "novedades", id);
    await updateDoc(ref, {
      nombre: editForm.nombre,
      precio: precioNumber,
      imagenUrl: editForm.imagenUrl,
      descripcion: editForm.descripcion,
      instagramUrl: editForm.instagramUrl,
    });
    // Actualiza en el estado local
    setNovedades(prev =>
      prev.map(n => n.id === id ? { ...n, ...editForm, precio: precioNumber } : n)
    );
    setEditingId(null);
  };

  // Para mostrar el precio bonito (opcional, puedes comentar si no quieres)
  function formatearPrecioCOP(valor) {
    if (!valor) return '$0';
    return '$' + Number(valor).toLocaleString('es-CO');
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Gestionar Novedades</h2>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-3 items-end bg-white p-3 rounded shadow">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del producto" required className="border p-2 rounded" />
        <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required className="border p-2 rounded" />
        <input name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="URL de la imagen" required className="border p-2 rounded" />
        <input name="instagramUrl" value={form.instagramUrl} onChange={handleChange} placeholder="URL Instagram (opcional)" className="border p-2 rounded" />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Historia/Descripción" required className="border p-2 rounded w-56" />
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded font-bold">Agregar Novedad</button>
      </form>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2">Imagen</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Instagram</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {novedades.map(n => (
            <tr key={n.id} className="border-b">
              <td className="p-2">
                {editingId === n.id ? (
                  <input
                    type="text"
                    value={editForm.imagenUrl}
                    onChange={e => setEditForm({ ...editForm, imagenUrl: e.target.value })}
                    className="border p-1 rounded w-32"
                    placeholder="URL Imagen"
                  />
                ) : (
                  n.imagenUrl
                    ? <img src={n.imagenUrl} alt={n.nombre} width={70} className="rounded shadow" />
                    : <span className="text-gray-400">Sin imagen</span>
                )}
              </td>
              <td className="p-2">
                {editingId === n.id ? (
                  <input
                    type="text"
                    value={editForm.nombre}
                    onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : n.nombre}
              </td>
              <td className="p-2">
                {editingId === n.id ? (
                  <input
                    type="number"
                    value={editForm.precio}
                    onChange={e => setEditForm({ ...editForm, precio: e.target.value })}
                    className="border p-1 rounded w-24"
                  />
                ) : formatearPrecioCOP(n.precio)}
              </td>
              <td className="p-2">
                {editingId === n.id ? (
                  <input
                    type="text"
                    value={editForm.instagramUrl}
                    onChange={e => setEditForm({ ...editForm, instagramUrl: e.target.value })}
                    className="border p-1 rounded"
                    placeholder="URL Instagram"
                  />
                ) : n.instagramUrl ? (
                  <a href={n.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver</a>
                ) : "-"}
              </td>
              <td className="p-2">
                {editingId === n.id ? (
                  <input
                    type="text"
                    value={editForm.descripcion}
                    onChange={e => setEditForm({ ...editForm, descripcion: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : n.descripcion}
              </td>
              <td className="p-2">
                {editingId === n.id ? (
                  <>
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800 mr-1"
                      onClick={async () => {
                        await handleUpdate(n.id, editForm);
                        setEditingId(null);
                      }}
                    >Guardar</button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-600"
                      onClick={() => setEditingId(null)}
                    >Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 mr-2"
                      onClick={() => {
                        setEditingId(n.id);
                        setEditForm({
                          nombre: n.nombre,
                          precio: n.precio,
                          imagenUrl: n.imagenUrl,
                          descripcion: n.descripcion,
                          instagramUrl: n.instagramUrl,
                        });
                      }}
                    >Editar</button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                    >Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNovedades;
