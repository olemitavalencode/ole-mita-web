import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // o "./firebase" según tu estructura
import axios from "axios";
import AdminNovedades from "./AdminNovedades";
import GestionUsuarios from "./GestionUsuarios";
import AdminGaleria from "./AdminGaleria";

  const MODULES = [
  { id: "banner", label: "Banner Principal" },
  { id: "products", label: "Productos" },
  { id: "novedades", label: "Novedades" },
   { id: "galeria", label: "Galería Instagram" },
  { id: "about", label: "Sección Nosotros" },
  { id: "contact", label: "Información de Contacto" },
  { id: "orders", label: "Pedidos" },
  { id: "categories", label: "Categorías" },
  { id: "users", label: "Gestionar Usuarios" },
  { id: "password", label: "Cambiar Contraseña" }
];

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djjxxdayz/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "olemitaweb";

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
 const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const response = await axios.post(CLOUDINARY_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });


  return response.data.secure_url;
};

const AdminPanel = ({
   allowedModules,
  onLogout,
  bannerInfo,
  onUpdateBanner,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  aboutInfo,
  onUpdateAbout,
  contactInfo,
  onUpdateContact,
  orders,
  onUpdateOrderStatus,
  categories,
  onAddCategory,
  onDeleteCategory,   // <-- ¡AQUÍ!
  onEditCategory,
  onUpdatePassword,
}) => {
  const [activeTab, setActiveTab] = useState('banner');
  const [newBannerTitle, setNewBannerTitle] = useState(bannerInfo.title);
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newBannerSubtitle, setNewBannerSubtitle] = useState(bannerInfo.subtitle);
const [newBannerVideos, setNewBannerVideos] = useState(
  Array.isArray(bannerInfo.videos) ? bannerInfo.videos.join(', ') : (bannerInfo.videos || '')
);
  const [newBannerImages, setNewBannerImages] = useState(bannerInfo.images || []);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
const [selectedFile, setSelectedFile] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [editProductImage, setEditProductImage] = useState('');
  const [editProductCategory, setEditProductCategory] = useState('');
  const [newAboutTitle, setNewAboutTitle] = useState(aboutInfo.title);
  const [newAboutParagraph1, setNewAboutParagraph1] = useState(aboutInfo.paragraph1);
  const [newAboutParagraph2, setNewAboutParagraph2] = useState(aboutInfo.paragraph2);
  const [newAboutImage, setNewAboutImage] = useState(aboutInfo.image);
  const [newContactEmail, setNewContactEmail] = useState(contactInfo.email);
  const [newContactPhone, setNewContactPhone] = useState(contactInfo.phone);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
const [passwordMsg, setPasswordMsg] = useState('');
const [passwordMsgColor, setPasswordMsgColor] = useState('red');


  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
const [editingId, setEditingId] = useState(null);
const [editingNombre, setEditingNombre] = useState('');
const [newProductNuevo, setNewProductNuevo] = useState(false);
const [newProductMasVendido, setNewProductMasVendido] = useState(false);
const [searchName, setSearchName] = useState('');
const [searchDate, setSearchDate] = useState('');
const [searchStatus, setSearchStatus] = useState('');
const [newVideoInput, setNewVideoInput] = useState('');

   "que no se me borre en el banner las url"
useEffect(() => {
  if (activeTab === 'banner' && bannerInfo) {
    setNewBannerTitle(bannerInfo.title || "");
    setNewBannerSubtitle(bannerInfo.subtitle || "");
setNewBannerVideos(
  Array.isArray(bannerInfo.videos)
    ? bannerInfo.videos.join(', ')
    : (bannerInfo.videos || '')
);
    setNewBannerImages(
      Array.isArray(bannerInfo.images)
        ? bannerInfo.images
        : (bannerInfo.images
            ? [bannerInfo.images]
            : [])
    );
  }
}, [activeTab, bannerInfo]);

const filteredOrders = orders.filter(order => {
  // Filtrar por nombre
  const matchesName = order.customerName?.toLowerCase().includes(searchName.toLowerCase());

  // Filtrar por estado
  const matchesStatus = searchStatus === '' || order.status === searchStatus;

  // Filtrar por fecha (YYYY-MM-DD)
  let matchesDate = true;
  if (searchDate && order.orderDate?.seconds) {
    const orderDateObj = new Date(order.orderDate.seconds * 1000);
    const orderDateString = orderDateObj.toISOString().slice(0, 10); // formato YYYY-MM-DD
    matchesDate = orderDateString === searchDate;
  }

  return matchesName && matchesStatus && matchesDate;
});

const handleUpdateBanner = async () => {
  try {
    const docRef = doc(db, "config", "mainBanner");

    // Soporta texto pegado con comas, saltos de línea o espacios
    let videosToSave = [];
    if (typeof newBannerVideos === "string") {
      videosToSave = newBannerVideos
        .split(/[\s,]+/)
        .map(url => url.trim())
        .filter(url => url.length > 0 && url.endsWith('.mp4'));
    } else if (Array.isArray(newBannerVideos)) {
      videosToSave = newBannerVideos
        .map(url => url.trim())
        .filter(url => url.length > 0 && url.endsWith('.mp4'));
    } else {
      videosToSave = [];
    }

    const imagesToSave = (newBannerImages && newBannerImages.length > 0)
      ? newBannerImages.filter(url => url.length > 0 && !url.endsWith('.mp4'))
      : (bannerInfo.images || []);

    await updateDoc(docRef, {
      title: newBannerTitle,
      subtitle: newBannerSubtitle,
      videos: videosToSave,
      images: imagesToSave,
    });
    alert('Banner actualizado!');
  } catch (error) {
    alert('Error al actualizar el banner');
    console.error(error);
  }
};

const handlePasswordChange = async () => {
  try {
    // Cambia este ID si tienes otro admin; por ahora, es el fijo:
    const adminDocRef = doc(db, "admins", "qz1fLwO6Dn26CauMWOaH");
    const adminDocSnap = await getDoc(adminDocRef);

    if (!adminDocSnap.exists()) {
      setPasswordMsg("No se encontró el usuario administrador.");
      setPasswordMsgColor('red');
      return;
    }
    const data = adminDocSnap.data();

    if (data.password !== currentPassword) {
      setPasswordMsg("La contraseña actual es incorrecta.");
      setPasswordMsgColor('red');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMsg("La nueva contraseña y la confirmación no coinciden.");
      setPasswordMsgColor('red');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setPasswordMsg("La nueva contraseña debe tener al menos 4 caracteres.");
      setPasswordMsgColor('red');
      return;
    }
    await updateDoc(adminDocRef, { password: newPassword });
    setPasswordMsg("¡Contraseña actualizada con éxito!");
    setPasswordMsgColor('green');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  } catch (error) {
    setPasswordMsg("Error al cambiar la contraseña.");
    setPasswordMsgColor('red');
    console.error(error);
  }
};

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'olemitaweb'); // tu preset unsigned

  const response = await fetch('https://api.cloudinary.com/v1_1/djjxxdayz/image/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data.secure_url;
};

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleAddProduct = async () => {
  if (
    newProductName.trim() !== "" &&
    newProductPrice.trim() !== "" &&
    newProductCategory.trim() !== "" &&
    newProductDescription.trim() !== "" &&
    selectedFile // Debe existir archivo seleccionado
  ) {
    // 1. Subir imagen a Cloudinary usando los datos correctos
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    const imageUrl = data.secure_url;

    // 2. Crear producto en Firestore
    const newProduct = {
      name: newProductName,
      price: newProductPrice,
      category: newProductCategory,
      description: newProductDescription,
      image: imageUrl,
      nuevo: newProductNuevo,         // <--- Añade esto
      masVendido: newProductMasVendido // <--- Y esto
    };
    
    await onAddProduct(newProduct);

    // 3. Limpiar campos del formulario
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
    setNewProductCategory('');
    setSelectedFile(null);
    setNewProductNuevo(false);           // <--- Limpia también los checkboxes
    setNewProductMasVendido(false);      // <---
    // Si quieres, limpia el input file con un ref
    alert('Producto agregado!');
  } else {
    alert('Por favor, rellena todos los campos del producto.');
  }
};

  const startEditProduct = (product) => {
    setEditProductId(product.id);
    setEditProductName(product.name);
    setEditProductPrice(product.price);
    setEditProductImage(product.image);
    setEditProductCategory(product.category);
  };

  const handleUpdateProduct = () => {
    if (editProductId && editProductName && editProductPrice && editProductImage && editProductCategory) {
      onUpdateProduct({
        id: editProductId,
        name: editProductName,
        price: editProductPrice,
        image: editProductImage,
        category: editProductCategory,
      });
      setEditProductId(null);
      alert('Producto actualizado!');
    } else {
      alert('Por favor, rellena todos los campos del producto a editar.');
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      onDeleteProduct(id);
      alert('Producto eliminado!');
    }
  };

  const handleUpdateAbout = () => {
    onUpdateAbout({
      title: newAboutTitle,
      paragraph1: newAboutParagraph1,
      paragraph2: newAboutParagraph2,
      image: newAboutImage,
    });
    alert('Información "Nosotros" actualizada!');
  };

  const handleUpdateContact = () => {
    onUpdateContact({
      email: newContactEmail,
      phone: newContactPhone,
    });
    alert('Información de contacto actualizada!');
  };


  const handleAddCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      onAddCategory(newCategoryName);
      setNewCategoryName('');
      alert('Categoría agregada!');
    } else {
      alert('La categoría ya existe o está vacía.');
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col z-50">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Panel Administrativo Olè Mita</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Botón hamburguesa SOLO visible en móvil */}
<button
  className="md:hidden absolute top-18 left-0 z-50 bg-orange-600 rounded p-2 text-white"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  ☰
</button>

<nav className={`
  bg-gray-900 text-white p-4 flex flex-col space-y-2 shadow-lg
  fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0 md:static md:w-64 md:h-auto
`}>
  <div className="flex justify-between items-center mb-6">
    <span className="font-bold text-xl">Panel Administrativo Olè Mita</span>
    {/* Botón para cerrar menú en móvil */}
    <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(false)}>&times;</button>
  </div>
  {MODULES.filter(m => allowedModules.includes(m.id)).map(m => (
    <button
      key={m.id}
      onClick={() => { setActiveTab(m.id); setSidebarOpen(false); }}
      className={`py-2 px-4 rounded-md text-left ${activeTab === m.id ? 'bg-orange-600' : 'hover:bg-gray-700'}`}
    >
      {m.label}
    </button>
  ))}
</nav>

<div className="flex-1 p-6 overflow-y-auto md:ml-64 pt-20 md:pt-6">
    {activeTab === 'banner' && allowedModules.includes('banner') && (            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Modificar Banner Principal</h2>
<div className="space-y-4">
  <div>
    <label className="block text-gray-700">Título del Banner</label>
    <input
      type="text"
      className="w-full p-2 border rounded-md"
      value={newBannerTitle}
      onChange={(e) => setNewBannerTitle(e.target.value)}
    />
  </div>
  <div>
    <label className="block text-gray-700">Subtítulo del Banner</label>
    <textarea
      className="w-full p-2 border rounded-md"
      value={newBannerSubtitle}
      onChange={(e) => setNewBannerSubtitle(e.target.value)}
    ></textarea>
  </div>
  <div>
    <label className="block text-gray-700">URLs de Videos (separadas por coma)</label>
<textarea
  className="w-full p-2 border rounded-md"
  value={newBannerVideos}
  onChange={e => setNewBannerVideos(e.target.value)}
  placeholder="Ej: url1.mp4, url2.mp4, url3.mp4"
/>
    <div className="flex flex-wrap gap-2 mt-2">
{(newBannerVideos
    ? newBannerVideos.split(/[\s,]+/).map(url => url.trim()).filter(url => url.length > 0 && url.endsWith('.mp4'))
    : []
  ).map((video, idx) => (
    <video key={idx} src={video} controls className="h-20 w-36 object-cover rounded-md" />
))}
    </div>
  </div>
  <div>
    <label className="block text-gray-700">URLs de Imágenes (separadas por coma)</label>
    <textarea
      className="w-full p-2 border rounded-md"
      value={newBannerImages.join(', ')}
      onChange={e => setNewBannerImages(e.target.value.split(',').map(url => url.trim()))}
      placeholder="Ej: url1.jpg, url2.jpg, url3.jpg"
    ></textarea>
    <div className="flex flex-wrap gap-2 mt-2">
      {newBannerImages.map((img, idx) => img && (
        <img key={idx} src={img} alt={`Preview ${idx}`} className="h-20 w-20 object-cover rounded-md" />
      ))}
    </div>
  </div>
  <button
    onClick={handleUpdateBanner}
    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
  >
    Actualizar Banner
  </button>
</div>
            </div>
          )}

         {activeTab === 'products' && allowedModules.includes('products') && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Gestionar Productos</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Agregar Nuevo Producto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Nombre</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Precio</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                  </div>
<div>
  <label className="block text-gray-700">Descripción</label>
  <input
    type="text"
    className="w-full p-2 border rounded-md"
    value={newProductDescription}
    onChange={(e) => setNewProductDescription(e.target.value)}
    placeholder="Descripción del producto"
  />
</div>
<div>
  <label className="block text-gray-700">Imagen</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
  />
</div>
                  <div>
                    <label className="block text-gray-700">Categoría</label>
<select
  className="w-full p-2 border rounded-md"
  value={newProductCategory}
  onChange={(e) => setNewProductCategory(e.target.value)}
>
  <option value="">Selecciona una categoría</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
  ))}
</select>
                  </div>
                  <div>
  <label>
    <input
      type="checkbox"
      checked={newProductNuevo}
      onChange={e => setNewProductNuevo(e.target.checked)}
      className="mr-2"
    />
    Producto nuevo
  </label>
</div>
<div>
  <label>
    <input
      type="checkbox"
      checked={newProductMasVendido}
      onChange={e => setNewProductMasVendido(e.target.checked)}
      className="mr-2"
    />
    Más vendido
  </label>
</div>

                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Agregar Producto
                </button>
              </div>

              <h3 className="text-xl font-semibold mb-2">Productos Existentes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
<tr>
  <th className="py-2 px-4 border-b text-center text-lg font-bold text-gray-800 bg-gray-50">ID Pedido</th>
  <th className="py-2 px-4 border-b text-center text-lg font-bold text-gray-800 bg-gray-50">Cliente</th>
  <th className="py-2 px-4 border-b text-center text-lg font-bold text-gray-800 bg-gray-50">Total</th>
  <th className="py-2 px-4 border-b text-center text-lg font-bold text-gray-800 bg-gray-50">Estado</th>
  <th className="py-2 px-4 border-b text-center text-lg font-bold text-gray-800 bg-gray-50">Acciones</th>
</tr>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="py-2 px-4 border-b">{product.id}</td>
                        <td className="py-2 px-4 border-b">
                          {editProductId === product.id ? (
                            <input
                              type="text"
                              value={editProductName}
                              onChange={(e) => setEditProductName(e.target.value)}
                              className="w-full p-1 border rounded-md"
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {editProductId === product.id ? (
                            <input
                              type="text"
                              value={editProductPrice}
                              onChange={(e) => setEditProductPrice(e.target.value)}
                              className="w-full p-1 border rounded-md"
                            />
                          ) : (
                            product.price
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {editProductId === product.id ? (
<select
  value={editProductCategory}
  onChange={(e) => setEditProductCategory(e.target.value)}
  className="w-full p-1 border rounded-md"
>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
  ))}
</select>
                          ) : (
                            product.category
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {editProductId === product.id ? (
                            <button
                              onClick={handleUpdateProduct}
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                            >
                              Guardar
                            </button>
                          ) : (
                            <button
                              onClick={() => startEditProduct(product)}
                              className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 mr-2"
                            >
                              Editar
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
{activeTab === 'galeria' && allowedModules.includes('galeria') && (
  <AdminGaleria />
)}

{activeTab === 'novedades' && allowedModules.includes('novedades') && (
  <AdminNovedades />
)}

          {activeTab === 'about'   && allowedModules.includes('about') && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Modificar Sección "Nosotros"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Título</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newAboutTitle}
                    onChange={(e) => setNewAboutTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Párrafo 1</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={newAboutParagraph1}
                    onChange={(e) => setNewAboutParagraph1(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Párrafo 2</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={newAboutParagraph2}
                    onChange={(e) => setNewAboutParagraph2(e.target.value)}
                  ></textarea>
                </div>
                <div>
<label className="block text-gray-700">Imagen</label>
<input
  type="file"
  className="w-full p-2 border rounded-md"
  onChange={e => setNewProductImage(e.target.files[0])}
/>
                  {newAboutImage && <img src={newAboutImage} alt="Preview" className="mt-2 h-32 object-cover" />}
                </div>
                <button
                  onClick={handleUpdateAbout}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Actualizar "Nosotros"
                </button>
              </div>
            </div>
          )}

          {activeTab === 'contact'  && allowedModules.includes('contact') && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Modificar Información de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleUpdateContact}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Actualizar Contacto
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders'  && allowedModules.includes('orders') && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Pedidos Realizados</h2>
              <div className="flex flex-col md:flex-row gap-2 mb-4">
  <input
    type="text"
    className="p-2 border rounded w-full md:w-1/3"
    placeholder="Buscar por nombre..."
    value={searchName}
    onChange={e => setSearchName(e.target.value)}
  />
  <input
    type="date"
    className="p-2 border rounded w-full md:w-1/3"
    value={searchDate}
    onChange={e => setSearchDate(e.target.value)}
  />
  <select
    className="p-2 border rounded w-full md:w-1/3"
    value={searchStatus}
    onChange={e => setSearchStatus(e.target.value)}
  >
    <option value="">Todos los estados</option>
    <option value="Pendiente">Pendiente</option>
    <option value="Procesando">Procesando</option>
    <option value="Enviado">Enviado</option>
    <option value="Entregado">Entregado</option>
    <option value="Cancelado">Cancelado</option>
  </select>
</div>

    
{filteredOrders.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID Pedido</th>
          <th className="py-2 px-4 border-b">Cliente</th>
          <th className="py-2 px-4 border-b">Total</th>
          <th className="py-2 px-4 border-b">Estado</th>
          <th className="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map((order) => (
 <tr
      key={order.id}
      className="hover:bg-orange-50 transition-colors border-b border-gray-200"
    >            <td className="py-2 px-4 border-b">{order.id}</td>
            <td className="py-2 px-4 border-b">{order.customerName}</td>
            <td className="py-2 px-4 border-b">${order.total}</td>
            <td className="py-2 px-4 border-b">
              <select
                value={order.status}
                onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                className="p-1 border rounded-md"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Procesando">Procesando</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleViewOrderDetails(order)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-gray-600">No hay pedidos realizados aún.</p>
)}

              {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative">
                    <button
                      onClick={handleCloseOrderDetails}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      &times;
                    </button>
                    <h3 className="text-2xl font-bold mb-4">Detalles del Pedido #{selectedOrder.id}</h3>
                    <div className="space-y-2">
                      <p><strong>Cliente:</strong> {selectedOrder.customerName}</p>
                      <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                      <p><strong>Teléfono:</strong> {selectedOrder.customerPhone}</p>
                      <p><strong>Total:</strong> ${selectedOrder.total}</p>
                      <p><strong>Estado:</strong> {selectedOrder.status}</p>
                      <p><strong>Productos:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {selectedOrder.products.map((p, idx) => (
                          <div key={idx}>{p.name} (x{p.quantity})</div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'categories'  && allowedModules.includes('categories') && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Gestionar Categorías</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Agregar Nueva Categoría</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nombre de la categoría"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Agregar
                  </button>
                </div>
              </div>
<div>
  <h3 className="text-xl font-semibold mb-2">Categorías Existentes</h3>
  <ul>
    {categories.map(cat => (
      <li key={cat.id || cat.nombre} className="flex items-center space-x-2 my-2">
        {editingId === cat.id ? (
          <>
            <input
              value={editingNombre}
              onChange={e => setEditingNombre(e.target.value)}
              className="border px-2 rounded"
            />
<button
  className="bg-green-500 text-white px-2 py-1 rounded"
  onClick={() => {
    onEditCategory(cat.id, editingNombre);
    setEditingId(null);
  }}
>
  Guardar
</button>
            <button
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => setEditingId(null)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <span>{cat.nombre}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                setEditingId(cat.id);
                setEditingNombre(cat.nombre);
              }}
            >
              Editar
            </button>
<button
  className="bg-red-500 text-white px-2 py-1 rounded"
  onClick={() => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      onDeleteCategory(cat.id)
    }
  }}
>
  Eliminar
</button>
          </>
        )}
      </li>
    ))}
  </ul>
</div>
            </div>
          )}

{activeTab === 'password' && allowedModules.includes('password') && (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700">Contraseña actual</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Nueva Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handlePasswordChange}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
      >
        Cambiar Contraseña
      </button>
      {passwordMsg && <p className="mt-3 text-center font-bold" style={{ color: passwordMsgColor }}>{passwordMsg}</p>}
    </div>
  </div>
)}

{activeTab === 'users' && allowedModules.includes('users') && (
  <GestionUsuarios />
)}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;