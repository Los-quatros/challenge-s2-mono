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
import Menu from "./components/Menu";
import { gsap } from "gsap";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Home = lazy(() => import("./pages/HomePage.js"));
const Categories = lazy(() => import("./pages/Categories"));
const $ = window.$;

window.$(function () {
	const header = $(".header");
	let menuActive = false;

	setHeader();
	initMenu();

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

	/**
	 * Init burger menu button
	 */
	function initMenu() {
		if ($(".hamburger").length) {
			handleHamburgerClick();
			handlePageMenu();
		}
	}

	/**
	 * Handle hamburger click
	 */
	function handleHamburgerClick() {
		const hamburger = $(".hamburger");

		hamburger.on("click", function (event) {
			event.stopPropagation();

			if (!menuActive) {
				openMenu();

				$(document).one("click", function cls(e) {
					if ($(e.target).hasClass("menu_mm")) {
						$(document).one("click", cls);
					} else {
						closeMenu();
					}
				});
			} else {
				$(".menu").removeClass("active");
				menuActive = false;
			}
		});
	}

	/**
	 * Handle page menu
	 */
	function handlePageMenu() {
		if ($(".page_menu_item").length) {
			const items = $(".page_menu_item");
			items.each(function () {
				const item = $(this);

				item.on("click", function (evt) {
					if (item.hasClass("has-children")) {
						evt.preventDefault();
						evt.stopPropagation();
						const subItem = item.find("> ul");
						if (subItem.hasClass("active")) {
							subItem.toggleClass("active");
							gsap.to(subItem, { duration: 0, height: 0 });
						} else {
							subItem.toggleClass("active");
							gsap.to(subItem, { height: "auto" });
							gsap.to(subItem, { duration: 0, height: 0 });
						}
					} else {
						evt.stopPropagation();
					}
				});
			});
		}
	}

	/**
	 * Open burger menu
	 */
	function openMenu() {
		const fs = $(".menu");
		fs.addClass("active");
		menuActive = true;
	}

	/**
	 * Close burger menu
	 */
	function closeMenu() {
		const fs = $(".menu");
		fs.removeClass("active");
		menuActive = false;
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
		}
	}, [location.pathname]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{displayHeader && <Header />}
			{displayHeader && <Menu />}
			<Routes>
				<Route path="/" element={<Home />} />
				{isAuth && <Route path="/login" element={<Login />} />}
				{isAuth && <Route path="/register" element={<Register />} />}
				<Route path="/categories/:category" element={<Categories />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			{!isAuth && <Footer />}
		</Suspense>
	);
};

export default App;
