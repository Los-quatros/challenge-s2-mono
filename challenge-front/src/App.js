import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';

import Footer from './components/Footer';
import Forbidden from './pages/Forbidden';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

const Login = lazy(() => import('./components/Login'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));
const NewPassword = lazy(() => import('./components/NewPassword'));
const Register = lazy(() => import('./components/Register'));
const Account = lazy(() => import('./pages/account/AccountPage'));
const Home = lazy(() => import('./pages/HomePage.js'));
const Categories = lazy(() => import('./pages/CategoriesPage'));
const ProductDetails = lazy(() =>
  import('./pages/products/ProductDetailsPage'),
);
const Contact = lazy(() => import('./pages/ContactPage'));
const Cart = lazy(() => import('./pages/CartPage'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const PaymentCancel = lazy(() => import('./pages/PaymentCancel'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));

const $ = window.$;

window.$(function () {
  const header = $('.header');

  setHeader();

  /**
   * Events
   */
  $(window).on('resize', () => setHeader());
  $(document).on('scroll', () => setHeader());

  /**
   * Set header class
   */
  function setHeader() {
    if ($(window).scrollTop() > 100) {
      header.addClass('scrolled');
    } else {
      header.removeClass('scrolled');
    }
  }
});

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

/**
 * Load CSS file and remove it if it already exists
 * @param { string } path Css file path
 */
const loadCSS = (path) => {
  const creationLink = document.createElement('link');
  creationLink.rel = 'stylesheet';
  creationLink.href = path;
  document.head.appendChild(creationLink);
};

/**
 * Clear all css files
 */
const clearLinks = () => {
  const links = document.head.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => document.head.removeChild(link));
};

const AppContent = () => {
  const hasToken = localStorage.getItem('token') ? true : false;
  const isAdmin = localStorage.getItem('role') === 'admin' ? true : false;
  const location = useLocation();
  const displayHeader =
    location.pathname !== '/login' &&
    !location.pathname.startsWith('/register') &&
    location.pathname !== '/reset-password' &&
    location.pathname !== '/new-password' &&
    !location.pathname.startsWith('/account') &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/payments') &&
    location.pathname !== '/forbidden';
  const displayFooter =
    location.pathname !== '/login' &&
    !location.pathname.startsWith('/register') &&
    location.pathname !== '/reset-password' &&
    location.pathname !== '/new-password' &&
    !location.pathname.startsWith('/account') &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/payments') &&
    location.pathname !== '/forbidden';
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!hasToken) {
      handleClearCart();
    }
  }, [hasToken]);

  useEffect(() => {
    clearLinks();
    if (location.pathname === '/') {
      loadCSS('./assets/styles/global.css');
      loadCSS('./assets/styles/home/home.css');
      loadCSS('./assets/styles/home/responsive.css');
      loadCSS('./assets/styles/home/animate.css');
      loadCSS('./assets/styles/home/owl.carousel.css');
      loadCSS('./assets/styles/home/owl.theme.default.css');
    } else if (location.pathname.startsWith('/categories')) {
      loadCSS('../assets/styles/global.css');
      loadCSS('../assets/styles/categories/categories.css');
      loadCSS('../assets/styles/categories/responsive.css');
    } else if (
      location.pathname === '/login' ||
      location.pathname.startsWith('/register') ||
      location.pathname === '/reset-password' ||
      location.pathname === '/new-password'
    ) {
      loadCSS('../assets/styles/global.css');
      loadCSS('../assets/styles/auth/auth.css');
      loadCSS('../assets/styles/auth/util.css');
    } else if (location.pathname.startsWith('/products')) {
      loadCSS('../../assets/styles/global.css');
      loadCSS('../../assets/styles/products/product.css');
      loadCSS('../../assets/styles/products/responsive.css');
    } else if (location.pathname === '/contact') {
      loadCSS('./assets/styles/global.css');
      loadCSS('./assets/styles/contact/contact.css');
      loadCSS('./assets/styles/contact/responsive.css');
    } else if (location.pathname === '/cart') {
      loadCSS('./assets/styles/global.css');
      loadCSS('./assets/styles/cart/cart.css');
      loadCSS('./assets/styles/cart/responsive.css');
    } else if (location.pathname.startsWith('/account')) {
      loadCSS('../assets/styles/global.css');
      loadCSS('../assets/styles/account/profile.css');
    } else if (location.pathname.startsWith('/admin')) {
      loadCSS('../assets/styles/admin/popup.css');
      loadCSS('../assets/styles/admin/sidebar.module.css');
      loadCSS('../assets/styles/admin/style.module.css');
    }
  }, [location.pathname]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartQuantity(cartItems.length);
    } else {
      setCartQuantity(0);
    }
  }, []);

  /**
   * Handle cart change
   */
  const handleCartChange = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartQuantity(cartItems.length);
    } else {
      setCartQuantity(0);
    }
  };

  /**
   * Handle clear cart
   */
  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartQuantity(0);
  };

  return (
    <Suspense>
      <ToastContainer />
      {displayHeader && <Header quantity={cartQuantity} />}
      <Routes>
        <Route path="/forbidden" element={<Forbidden />} />
        {isAdmin && <Route path="/admin" element={<Dashboard />} />}
        <>
          <Route
            path="/"
            element={<Home handleCartChange={handleCartChange} />}
          />
          {!hasToken && <Route path="/login" element={<Login />} />}
          {!hasToken && (
            <Route path="/new-password" element={<NewPassword />} />
          )}
          {!hasToken && (
            <Route path="/reset-password" element={<ResetPassword />} />
          )}
          {!hasToken && <Route path="/register/:name" element={<Register />} />}
          <Route path="/categories/:category" element={<Categories />} />
          {hasToken && <Route path="/account/:name" element={<Account />} />}
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={<Cart handleClearCart={handleClearCart} />}
          />
          <Route
            path="/products/:category/:productId"
            element={<ProductDetails handleCartChange={handleCartChange} />}
          />
          {hasToken && (
            <Route path="/payments/cancel" element={<PaymentCancel />} />
          )}
          {hasToken && (
            <Route path="/payments/success/:id" element={<PaymentSuccess />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      </Routes>

      {displayFooter && <Footer />}
    </Suspense>
  );
};

export default App;
