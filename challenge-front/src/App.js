import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Home = lazy(() => import("./pages/HomePage.js"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductDetails = lazy(() =>
	import("./pages/products/ProductDetailsPage")
);

const $ = window.$;

window.$(function () {
	const header = $(".header");

	setHeader();

	/**
	 * Events
	 */
	$(window).on("resize", () => setHeader());
	$(document).on("scroll", () => setHeader());

	/**
	 * Set header class
	 */
	function setHeader() {
		if ($(window).scrollTop() > 100) {
			header.addClass("scrolled");
		} else {
			header.removeClass("scrolled");
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
	const creationLink = document.createElement("link");
	creationLink.rel = "stylesheet";
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
	const location = useLocation();
	const displayHeader =
		location.pathname !== "/login" && location.pathname !== "/register";
	const isAuth =
		location.pathname === "/login" || location.pathname === "/register";

	useEffect(() => {
		clearLinks();
		if (location.pathname === "/") {
			loadCSS("./assets/styles/bootstrap.min.css");
			loadCSS("./assets/styles/home/home.css");
			loadCSS("./assets/styles/home/responsive.css");
			loadCSS("./assets/styles/home/animate.css");
			loadCSS("./assets/styles/home/owl.carousel.css");
			loadCSS("./assets/styles/home/owl.theme.default.css");
		} else if (location.pathname.startsWith("/categories")) {
			loadCSS("../assets/styles/bootstrap.min.css");
			loadCSS("../assets/styles/categories/categories.css");
			loadCSS("../assets/styles/categories/responsive.css");
		} else if (
			location.pathname === "/login" ||
			location.pathname === "/register"
		) {
			loadCSS("./assets/styles/bootstrap.min.css");
			loadCSS("./assets/styles/auth/auth.css");
			loadCSS("./assets/styles/auth/util.css");
		} else if (location.pathname.startsWith("/products")) {
			loadCSS("../../assets/styles/bootstrap.min.css");
			loadCSS("../../assets/styles/products/product.css");
			loadCSS("../../assets/styles/products/responsive.css");
		}
	}, [location.pathname]);

	return (
		<Suspense fallback={<span>...</span>}>
			{displayHeader && <Header />}
			<Routes>
				<Route path="/" element={<Home />} />
				{isAuth && <Route path="/login" element={<Login />} />}
				{isAuth && <Route path="/register" element={<Register />} />}
				<Route path="/categories/:category" element={<Categories />} />
				<Route
					path="/products/:category/:productId"
					element={<ProductDetails />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			{!isAuth && <Footer />}
		</Suspense>
	);
};

export default App;
