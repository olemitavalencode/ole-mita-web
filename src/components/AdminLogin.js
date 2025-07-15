import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ajusta la ruta si es necesario


const AdminLogin = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = async () => {
  try {
    const q = query(
      collection(db, "admins"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Cambia SOLO esta línea:
      const usuario = querySnapshot.docs[0].data();
      onLogin(usuario.modules || []);
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  } catch (error) {
    setError('Error al conectar con la base de datos.');
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión Admin</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;