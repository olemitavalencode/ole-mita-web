import React, { useState, useEffect } from 'react';
import ShopHeader from './components/ShopHeader';
import ShopHeroSection from './components/ShopHeroSection';
import ShopProductGrid from './components/ShopProductGrid';
import ShopProductDetail from './components/ShopProductDetail';
import ShopAboutSection from './components/ShopAboutSection';
import ShopContactSection from './components/ShopContactSection';
import ShopFooter from './components/ShopFooter';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import WelcomeSection from './components/WelcomeSection';
import ShopCart from './components/ShopCart';
import CheckoutForm from './components/CheckoutForm';
import ShopFaqSection from './components/ShopFaqSection'; // Importar la nueva sección de FAQ
// No es necesario importar index.css aquí, ya que se importa en el archivo principal de tu aplicación (generalmente index.js o main.jsx)
// Si estás usando Create React App o Vite, el archivo CSS global se importa en el punto de entrada de la aplicación.
import GallerySection from './components/GallerySection';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import ShopNewsSection from './components/ShopNewsSection';
import LocalSection from './components/LocalSection';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopNovedadesCarousel from "./components/ShopNovedadesCarousel";



const DEFAULT_BANNER = {
  title: 'Descubre la Esencia de México en Olè Mita',
  subtitle: 'Productos artesanales con el alma y el sabor de nuestra tierra.',
  videos: [
    'https://i.imgur.com/ldgr0un.mp4',
    'https://i.imgur.com/kKUIfc0.mp4',
    'https://i.imgur.com/KoJK0nV.mp4',
  ]
};

function App() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);
useEffect(() => {
  // Cambia 2000 por los milisegundos que desees (ej: 4000 para 4 segundos)
  const timer = setTimeout(() => {
    setIsSplashLoading(false);
  }, 3000); // 3 segundos de splash

  return () => clearTimeout(timer);
}, []);

  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
const [allowedModules, setAllowedModules] = useState([]);

  
  // Estado para el reconocimiento de gestos
  const [gesturePoints, setGesturePoints] = useState([]);
  const gestureThreshold = 50;
  const gestureTimeThreshold = 500;

// Banner conectado a Firestore
// ...tus estados previos...

const [bannerTextInfo, setBannerTextInfo] = useState(() => {
  const local = localStorage.getItem('bannerTextInfo');
  return local ? JSON.parse(local) : {
    title: DEFAULT_BANNER.title,
    subtitle: DEFAULT_BANNER.subtitle,
  };
});
const [bannerVideos, setBannerVideos] = useState(() => {
  
  const local = localStorage.getItem('bannerVideos');
  return local ? JSON.parse(local) : DEFAULT_BANNER.videos;
});
 const [isBannerLoading, setIsBannerLoading] = useState(true);

useEffect(() => {
  fetchBanner();
}, []);

const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const productsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  };
  fetchProducts();
}, []);


const [aboutInfo, setAboutInfo] = useState(() => {
  const local = localStorage.getItem('aboutInfo');
  return local ? JSON.parse(local) : {
    title: '',
    paragraph1: '',
    paragraph2: '',
    image: ''
  };
});
const [aboutLoading, setAboutLoading] = useState(true);

// Cargar desde Firestore al abrir la app
useEffect(() => {
  const fetchAboutInfo = async () => {
    try {
      const docRef = doc(db, "nosotros", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAboutInfo(docSnap.data());
        localStorage.setItem('aboutInfo', JSON.stringify(docSnap.data())); // Guarda también en local
      }
    } finally {
      setAboutLoading(false);
    }
  };
  fetchAboutInfo();
}, []);
const [contactInfo, setContactInfo] = useState(() => {
  const local = localStorage.getItem('contactInfo');
  return local ? JSON.parse(local) : {
    email: '',
    phone: '',
  };
});
const [isContactLoading, setIsContactLoading] = useState(true);

useEffect(() => {
  const fetchContact = async () => {
    try {
      const docRef = doc(db, "contactInfo", "configcontactInfo");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactInfo(docSnap.data());
        localStorage.setItem('contactInfo', JSON.stringify(docSnap.data()));
      }
    } finally {
      setIsContactLoading(false);
    }
  };
  fetchContact();
}, []);


const [categories, setCategories] = useState([]);
const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const cats = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre
      }));
      setCategories(cats);
      localStorage.setItem('categories', JSON.stringify(cats));
    } finally {
      setIsCategoriesLoading(false);
    }
  };
  fetchCategories();
}, []);
  const [adminPassword, setAdminPassword] = useState('12345');
  const [orders, setOrders] = useState([]);


useEffect(() => {
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "pedidos"));
    const ordersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setOrders(ordersList);
  };
  fetchOrders();
}, []);
const fetchBanner = async () => {
  try {
    const docRef = doc(db, "config", "mainBanner");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.videos && data.videos.length > 0) {
        setBannerVideos(data.videos);
        localStorage.setItem('bannerVideos', JSON.stringify(data.videos));
      }
      const newBanner = { title: data.title, subtitle: data.subtitle };
      setBannerTextInfo(newBanner);
      localStorage.setItem('bannerTextInfo', JSON.stringify(newBanner));
    }
  } finally {
    setIsBannerLoading(false);
  }
};

  // Funciones para el panel administrativo
const handleUpdateBanner = async () => {
  await fetchBanner(); // <-- Así SIEMPRE actualiza el estado con lo que hay en Firestore después de guardar
};

const handleAddProduct = async (newProduct) => {
  await addDoc(collection(db, "productos"), newProduct);
  // Refresca productos
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productsList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  setProducts(productsList);
};

const handleUpdateProduct = async (updatedProduct) => {
  // Actualiza el documento en Firestore
  await updateDoc(doc(db, "productos", updatedProduct.id), {
    name: updatedProduct.name,
    price: updatedProduct.price,
    image: updatedProduct.image,
    category: updatedProduct.category,
  });

  // Refresca la lista de productos desde Firestore
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productsList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  setProducts(productsList);
};

const handleDeleteProduct = async (id) => {
  // Borra el documento en Firestore
  await deleteDoc(doc(db, "productos", id));
  
  // Refresca la lista de productos desde Firestore
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productsList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  setProducts(productsList);
};

const handleUpdateAbout = async (newInfo) => {
  await setDoc(doc(db, "nosotros", "main"), newInfo);  // Guarda en Firestore
  setAboutInfo(newInfo);                               // Actualiza estado local
  localStorage.setItem('aboutInfo', JSON.stringify(newInfo)); // Refresca local
};

const handleUpdateContact = async (newInfo) => {
  await setDoc(doc(db, "contactInfo", "configcontactInfo"), newInfo);
  setContactInfo(newInfo);
  localStorage.setItem('contactInfo', JSON.stringify(newInfo));
};

  const handleUpdateAdminPassword = (newPass) => {
    setAdminPassword(newPass);
  };

const handleAddCategory = async (nombre) => {
  const newCat = { nombre };
  const docRef = await addDoc(collection(db, "categorias"), newCat);
  const catWithId = { ...newCat, id: docRef.id };
  setCategories(prev => [...prev, catWithId]);
  localStorage.setItem('categories', JSON.stringify([...categories, catWithId]));
};
const handleEditCategory = async (id, nuevoNombre) => {
  await updateDoc(doc(db, "categorias", id), { nombre: nuevoNombre });
  setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, nombre: nuevoNombre } : cat));
  localStorage.setItem('categories', JSON.stringify(
    categories.map(cat => cat.id === id ? { ...cat, nombre: nuevoNombre } : cat)
  ));
};
const handleDeleteCategory = async (id) => {
  await deleteDoc(doc(db, "categorias", id));
  const updated = categories.filter(cat => cat.id !== id);
  setCategories(updated);
  localStorage.setItem('categories', JSON.stringify(updated));
};

const handleUpdateOrderStatus = async (orderId, newStatus) => {
  await updateDoc(doc(db, "pedidos", orderId), { status: newStatus });

  // Recarga la lista después del cambio
  const querySnapshot = await getDocs(collection(db, "pedidos"));
  const ordersList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setOrders(ordersList);
};
  // Lógica de búsqueda
  const [filteredProducts, setFilteredProducts] = useState(products);

const handleNavigate = (page) => {
  setCurrentPage(page);
  setSelectedProduct(null);
  setHistory((prevHistory) => {
    const newHistory = [...prevHistory];
    if (newHistory[newHistory.length - 1] !== page) {
      newHistory.push(page);
    }
    return newHistory;
  });

  window.scrollTo(0, 0); // <--- ESTA LÍNEA, agrega aquí

  if (page === 'shop') {
    setFilteredProducts(products);
    setCurrentProductPage(1);
  }
};

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProducts(results);
    setCurrentPage('shop');
    setCurrentProductPage(1);
    setSelectedProduct(null);
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      if (newHistory[newHistory.length - 1] !== 'shop') {
        newHistory.push('shop');
      }
      return newHistory;
    });
  };

  const handleProductPageChange = (page) => {
    setCurrentProductPage(page);
  };

  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
    setHistory((prevHistory) => [...prevHistory, 'productDetail']);
  };

  const handleBackFromProductDetail = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const newHistory = [...prevHistory];
        newHistory.pop();
        setCurrentPage(newHistory[newHistory.length - 1]);
        setSelectedProduct(null);
        return newHistory;
      }
      return prevHistory;
    });
  };

const handleAddToCart = (product) => {
  // Detecta si el producto viene de novedades (campos diferentes)
  const cartItem = {
    id: product.id,
    name: product.name || product.nombre || "Producto sin nombre",
    image: product.image || product.imagenUrl || "",
    price: Number(product.price ?? product.precio ?? 0), // forzamos número
    quantity: 1
  };

  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === cartItem.id);
    if (existingItem) {
      return prevItems.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevItems, cartItem];
    }
  });
  alert(`${cartItem.name} ha sido añadido al carrito!`);
};

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Por favor, añade productos antes de proceder al pago.');
      return;
    }
    setCurrentPage('checkout');
    setHistory((prevHistory) => [...prevHistory, 'checkout']);
  };

const handleConfirmOrder = async (orderDetails) => {
  // Estructura del pedido
  const newOrder = {
    customerName: orderDetails.customerName,
    customerEmail: orderDetails.customerEmail,
    customerPhone: orderDetails.customerPhone,
    customerAddress: orderDetails.customerAddress,
    paymentMethod: orderDetails.paymentMethod,
    products: orderDetails.products,
    total: orderDetails.total,
    status: "Pendiente",
    orderDate: Timestamp.now(), // ¡Fecha real de Firestore!
  };

  // Guarda en Firestore
  await addDoc(collection(db, "pedidos"), newOrder);

  // WhatsApp y limpiar carrito igual que antes
  const whatsappMessage = `¡Hola ${orderDetails.customerName}!%0A%0ATu pedido en Olè Mita ha sido confirmado.%0A%0ADetalles del pedido:%0A${orderDetails.products.map(p => `- ${p.name} (x${p.quantity}) - $${(parseFloat(p.price) * p.quantity).toFixed(2)}`).join('%0A')}%0A%0ATotal: $${orderDetails.total} MXN%0A%0AMétodo de pago: ${orderDetails.paymentMethod}%0A%0ANos pondremos en contacto contigo para coordinar la entrega en ${orderDetails.customerAddress}.%0A%0A¡Gracias por tu compra!`;
  const whatsappUrl = `https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;
  window.open(whatsappUrl, '_blank');

  setCartItems([]);
  alert('¡Pedido confirmado! Revisa tu correo y WhatsApp para los detalles.');
  setCurrentPage('home');
  setHistory(['home']);
};
  // Manejar el botón de retroceso del navegador
  useEffect(() => {
    const handlePopState = () => {
      setHistory((prevHistory) => {
        if (prevHistory.length > 1) {
          const newHistory = [...prevHistory];
          newHistory.pop();
          setCurrentPage(newHistory[newHistory.length - 1]);
          setSelectedProduct(null);
          return newHistory;
        }
        return prevHistory;
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Actualizar el historial del navegador cuando currentPage cambia
  useEffect(() => {
    if (window.history.state?.page !== currentPage) {
      window.history.pushState({ page: currentPage }, '', `#${currentPage}`);
    }
  }, [currentPage]);

  // Lógica para activar el login de admin con CTRL + F2 (para desktop)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'F2') {
        event.preventDefault();
        setShowAdminLogin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lógica para el gesto de "L" en dispositivos móviles
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let points = [];
    let lastTimestamp = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      points = [{ x: startX, y: startY, t: Date.now() }];
      lastTimestamp = Date.now();
    };

    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const currentTime = Date.now();

      if (currentTime - lastTimestamp > gestureTimeThreshold) {
        points = [{ x: currentX, y: currentY, t: currentTime }];
      } else {
        points.push({ x: currentX, y: currentY, t: currentTime });
      }
      lastTimestamp = currentTime;
    };

    const handleTouchEnd = () => {
      if (points.length < 3) {
        points = [];
        return;
      }

      const simplifiedPoints = [points[0]];
      for (let i = 1; i < points.length - 1; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const p3 = points[i + 1];

        const angle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);
        let angleDiff = Math.abs(angle1 - angle2) * 180 / Math.PI;
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        if (angleDiff > 45 && angleDiff < 135) {
          simplifiedPoints.push(p2);
        }
      }
      simplifiedPoints.push(points[points.length - 1]);

      if (simplifiedPoints.length === 3) {
        const [pA, pB, pC] = simplifiedPoints;

        const distAB = Math.sqrt(Math.pow(pB.x - pA.x, 2) + Math.pow(pB.y - pA.y, 2));
        const distBC = Math.sqrt(Math.pow(pC.x - pB.x, 2) + Math.pow(pC.y - pB.y, 2));

        if (distAB > gestureThreshold && distBC > gestureThreshold) {
          const isVerticalFirst = Math.abs(pB.x - pA.x) < Math.abs(pB.y - pA.y);
          const isHorizontalSecond = Math.abs(pC.x - pB.x) > Math.abs(pC.y - pB.y);

          const isDown = pB.y > pA.y;
          const isRight = pC.x > pB.x;

          if (isVerticalFirst && isHorizontalSecond && isDown && isRight) {
            setShowAdminLogin(true);
          }
        }
      }
      points = [];
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);


const handleAdminLogin = (modules) => {
  setAllowedModules(modules);
  setIsAdminLoggedIn(true);
  setShowAdminLogin(false);
};

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {isAdminLoggedIn ? (
<AdminPanel
 allowedModules={allowedModules} 
  onLogout={handleAdminLogout}
  bannerInfo={{
    ...bannerTextInfo,
    videos: bannerVideos,               // <--- PASA el array completo
    video: bannerVideos[0] || "",       // (opcional, solo si quieres mostrar el primero)
    images: []                          // (si usas imágenes)
  }}
  onUpdateBanner={handleUpdateBanner}
  products={products}
  onAddProduct={handleAddProduct}
  onUpdateProduct={handleUpdateProduct}
  onDeleteProduct={handleDeleteProduct}
  aboutInfo={aboutInfo}
  onUpdateAbout={handleUpdateAbout}
  contactInfo={contactInfo}
  onUpdateContact={handleUpdateContact}
  orders={orders}
  onUpdateOrderStatus={handleUpdateOrderStatus}
  categories={categories}
  onAddCategory={handleAddCategory}
  onDeleteCategory={handleDeleteCategory} 
  onEditCategory={handleEditCategory} 
  onUpdatePassword={handleUpdateAdminPassword}
/>
      ) : (
        <>
        {/* Fondo animado de burbujas */}
<div className="bg-bubbles">
  <span></span><span></span><span></span><span></span>
  <span></span><span></span><span></span><span></span>
  <span></span><span></span><span></span><span></span>
  <span></span><span></span><span></span><span></span>
  <span></span><span></span><span></span><span></span>
</div>
          <ShopHeader onNavigate={handleNavigate} onSearch={handleSearch} cartItemCount={cartItems.length} />

          <main className="pt-20">
            {currentPage === 'home' && (
              <>
<ShopHeroSection
  bannerVideos={bannerVideos && bannerVideos.length > 0 ? bannerVideos : DEFAULT_BANNER.videos}
  isLoading={isBannerLoading}
/>

<WelcomeSection bannerText={bannerTextInfo} onExploreProducts={() => handleNavigate('shop')} />

<ShopNovedadesCarousel onAddToCart={handleAddToCart} />
 
<ShopProductGrid
  products={products}
  visibleCount={3}        // Cambia si quieres más/menos productos visibles
  autoSlideInterval={4000} // Cambia el tiempo de slide automático (milisegundos)
  onViewDetails={handleViewProductDetails} // Si tienes función para ver detalles
/>
{aboutLoading && !aboutInfo.title ? (
  <div className="text-center my-8 text-gray-500">Cargando sección "Nosotros"...</div>
) : (
  <ShopAboutSection aboutInfo={aboutInfo} />
)}

<GallerySection />

              </>
              
            )}
            {currentPage === 'shop' && (
              <ShopProductGrid
                products={filteredProducts}
                productsPerPage={productsPerPage}
                currentPage={currentProductPage}
                onPageChange={handleProductPageChange}
                onViewDetails={handleViewProductDetails}
              />
            )}
            {currentPage === 'productDetail' && (
              <ShopProductDetail product={selectedProduct} onBack={handleBackFromProductDetail} onAddToCart={handleAddToCart} />
            )}
            {currentPage === 'about' && <ShopAboutSection aboutInfo={aboutInfo} />}
{currentPage === 'contact' && (
  isContactLoading && !contactInfo.email ? (
    <div className="text-center my-8 text-gray-500">Cargando información de contacto...</div>
  ) : (
    <ShopContactSection contactInfo={contactInfo} />
  )
)}
            {currentPage === 'news' && <ShopNewsSection />}
            {currentPage === 'faq' && <ShopFaqSection />}
            {currentPage === 'cart' && (
              <ShopCart
                cartItems={cartItems}
                onBack={() => handleNavigate('shop')}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onProceedToCheckout={handleProceedToCheckout}
              />
            )}
            {currentPage === 'checkout' && (
              <CheckoutForm
                cartItems={cartItems}
                total={cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
                onConfirmOrder={handleConfirmOrder}
                onBack={() => handleNavigate('cart')}
              />
            )}
          </main>
<LocalSection /> 
<ShopFooter onNavigate={handleNavigate} contactInfo={contactInfo} />

          {showAdminLogin && (
            <AdminLogin onLogin={handleAdminLogin} onClose={() => setShowAdminLogin(false)} />
          )}
        </>
      )}
      // --- Botón flotante de WhatsApp ---
<a
  href="https://wa.me/573103384560?text=¡Hola!%20Quisiera%20más%20información%20sobre%20Olè%20Mita"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50"
  style={{ textDecoration: 'none' }}
>
  <div className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 rounded-full p-3 shadow-2xl transition-all animate-bounce group">
    <svg
      className="w-8 h-8 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.52 3.47A11.72 11.72 0 0 0 12 0C5.39 0 0 5.23 0 11.67c0 2.06.55 4.07 1.61 5.86L0 24l6.6-1.73a12.5 12.5 0 0 0 5.4 1.26h.01c6.61 0 12-5.23 12-11.67 0-3.13-1.31-6.08-3.49-8.13ZM12 21.08a10.2 10.2 0 0 1-5.19-1.43l-.37-.22-3.92 1.03 1.05-3.83-.24-.4A9.38 9.38 0 0 1 2 11.67C2 6.09 6.99 1.92 12 1.92c2.66 0 5.18 1.02 7.08 2.85a9.8 9.8 0 0 1 3.02 6.9c0 5.58-4.99 10.25-10.1 10.25Zm5.6-7.65c-.31-.16-1.84-.91-2.12-1.02-.28-.1-.49-.16-.7.16-.2.32-.81 1.02-.99 1.23-.18.21-.36.24-.67.08-.31-.16-1.32-.48-2.52-1.53-.93-.83-1.56-1.85-1.75-2.16-.18-.31-.02-.48.13-.63.13-.13.29-.34.44-.51.15-.18.2-.3.3-.49.1-.2.05-.38-.03-.54-.08-.16-.7-1.68-.95-2.3-.25-.61-.51-.53-.7-.54l-.6-.01c-.19 0-.5.07-.76.33-.26.26-1 1-.98 2.45.02 1.45 1.08 2.86 1.23 3.05.15.19 2.14 3.27 5.19 4.44.73.25 1.29.39 1.73.5.73.18 1.39.15 1.91.09.58-.07 1.79-.73 2.05-1.44.25-.7.25-1.3.18-1.44-.07-.13-.29-.21-.6-.37Z"/>
    </svg>
    <span className="text-white font-bold hidden sm:inline group-hover:scale-110 transition-transform">WhatsApp</span>
  </div>
</a>

    </div>
  );
}

export default App;

// DONE