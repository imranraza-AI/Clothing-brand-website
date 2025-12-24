import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StoreLayout from './layouts/StoreLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import AiStudio from './pages/AiStudio';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ProductProvider>
      <AdminProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Store Routes */}
              <Route path="/" element={<StoreLayout />}>
                <Route index element={<Home />} />
                <Route path="collections" element={<Collections />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="tracking" element={<OrderTracking />} />
                <Route path="ai-studio" element={<AiStudio />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </Router>
        </CartProvider>
      </AdminProvider>
    </ProductProvider>
  );
};

export default App;