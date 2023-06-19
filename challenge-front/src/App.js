import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";

import $ from "jquery";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Menu from "./components/Menu";
import RegisterPage from "./pages/RegisterPage";
import gsap from "gsap";

$(function () {
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

const AppContent = () => {
	const location = useLocation();
	const displayHeader =
		location.pathname !== "/login" && location.pathname !== "/register";

	return (
		<>
			{displayHeader && <Header />}
			{displayHeader && <Menu />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
};

export default App;
