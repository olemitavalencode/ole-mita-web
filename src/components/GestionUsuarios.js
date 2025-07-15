import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const MODULES_LIST = [
  { id: "banner", label: "Banner Principal" },
  { id: "products", label: "Productos" },
  { id: "novedades", label: "Novedades" },
  { id: "about", label: "Sección Nosotros" },
  { id: "contact", label: "Información de Contacto" },
  { id: "orders", label: "Pedidos" },
  { id: "categories", label: "Categorías" },
  { id: "password", label: "Cambiar Contraseña" },
  { id: "users", label: "Gestionar Usuarios" }
];

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('1234');
  const [selectedModules, setSelectedModules] = useState(['orders', 'password']);
  const [userMsg, setUserMsg] = useState('');
  const [userMsgColor, setUserMsgColor] = useState('red');
const [editingUserId, setEditingUserId] = useState(null);
const [editUsername, setEditUsername] = useState('');
const [editPassword, setEditPassword] = useState('');
const [editModules, setEditModules] = useState([]);

  // Cargar usuarios existentes
  useEffect(() => {
    const fetchUsuarios = async () => {
      const snap = await getDocs(collection(db, "admins"));
      setUsuarios(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsuarios();
  }, []);

  const handleCreateUser = async () => {
    if (!newUsername || !newUserPassword || selectedModules.length === 0) {
      setUserMsg("Rellena todos los campos y elige al menos un módulo.");
      setUserMsgColor('red');
      return;
    }
    try {
      await addDoc(collection(db, "admins"), {
        username: newUsername,
        password: newUserPassword,
        modules: selectedModules
      });
      setUserMsg("Usuario creado con éxito!");
      setUserMsgColor('green');
      setNewUsername('');
      setNewUserPassword('1234');
      setSelectedModules(['orders', 'password']);
      // Actualizar la lista de usuarios
      const snap = await getDocs(collection(db, "admins"));
      setUsuarios(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      setUserMsg("Error al crear usuario.");
      setUserMsgColor('red');
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    if(window.confirm('¿Seguro de eliminar este usuario?')) {
      await deleteDoc(doc(db, "admins", id));
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

const startEditUser = (user) => {
  setEditingUserId(user.id);
  setEditUsername(user.username);
  setEditPassword(user.password);
  setEditModules(user.modules || []);
};

const handleSaveEditUser = async () => {
  if (!editUsername || !editPassword || editModules.length === 0) {
    setUserMsg("Rellena todos los campos y módulos.");
    setUserMsgColor('red');
    return;
  }
  try {
    const ref = doc(db, "admins", editingUserId);
    await updateDoc(ref, {
      username: editUsername,
      password: editPassword,
      modules: editModules
    });
    setUserMsg("Usuario editado con éxito!");
    setUserMsgColor('green');
    setEditingUserId(null);
    // Recarga la lista de usuarios:
    const snap = await getDocs(collection(db, "admins"));
    setUsuarios(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    setUserMsg("Error al editar usuario.");
    setUserMsgColor('red');
    console.error(error);
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="font-semibold mb-2">Crear Nuevo Usuario</h3>
        <input
          placeholder="Nombre de usuario"
          className="border p-2 rounded mr-2"
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          className="border p-2 rounded mr-2"
          value={newUserPassword}
          onChange={e => setNewUserPassword(e.target.value)}
        />
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
  {MODULES_LIST.map(m => (
    <label key={m.id} className="inline-flex items-center">
      <input
        type="checkbox"
        checked={editModules.includes(m.id)}
        onChange={e => {
          if (e.target.checked) setEditModules([...editModules, m.id]);
          else setEditModules(editModules.filter(mod => mod !== m.id));
        }}
        className="accent-orange-600 mr-2"
      />
      {m.label}
    </label>
  ))}
</div>
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded ml-4 mt-2"
          onClick={handleCreateUser}
        >
          Crear Usuario
        </button>
{userMsg && (
  <div
    className={`mt-2 px-4 py-2 rounded font-bold text-center ${
      userMsgColor === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}
  >
    {userMsg}
  </div>
)}
      </div>
<div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="font-semibold mb-2">Usuarios Existentes</h3>
        <table className="min-w-full">
          <thead>
 <tr>
      <th className="p-2 bg-gray-100 font-bold border-b-2 border-gray-200 text-left">Usuario</th>
      <th className="p-2 bg-gray-100 font-bold border-b-2 border-gray-200 text-left">Módulos</th>
      <th className="p-2 bg-gray-100 font-bold border-b-2 border-gray-200 text-left">Acción</th>
    </tr>          </thead>
<tbody>
  {usuarios.map(u => (
    <tr key={u.id}>
      {editingUserId === u.id ? (
        <>
          <td className="p-2">
            <input
              value={editUsername}
              onChange={e => setEditUsername(e.target.value)}
              className="border p-1 rounded"
            />
          </td>
          <td className="p-2">
            <input
              value={editPassword}
              onChange={e => setEditPassword(e.target.value)}
              className="border p-1 rounded"
              type="password"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {MODULES_LIST.map(m => (
                <label key={m.id}>
                  <input
                    type="checkbox"
                    checked={editModules.includes(m.id)}
                    onChange={e => {
                      if (e.target.checked) setEditModules([...editModules, m.id]);
                      else setEditModules(editModules.filter(mod => mod !== m.id));
                    }}
                  />
                  {" "}{m.label}
                </label>
              ))}
            </div>
          </td>
          <td className="p-2">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded mr-2"
              onClick={handleSaveEditUser}
            >
              Guardar
            </button>
            <button
              className="bg-gray-400 text-white px-2 py-1 rounded"
              onClick={() => setEditingUserId(null)}
            >
              Cancelar
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-2">{u.username}</td>
          <td className="p-2">{Array.isArray(u.modules) ? u.modules.join(", ") : ""}</td>
          <td className="p-2">
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
              onClick={() => startEditUser(u)}
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteUser(u.id)}
            >
              Eliminar
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUsuarios;
