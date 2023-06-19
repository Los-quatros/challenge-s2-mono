import $ from "jquery";
import Header from "./components/Header";
import Menu from "./components/Menu";

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
						} else {
							subItem.toggleClass("active");
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

function App() {
	return (
		<>
			<Header />
			<Menu />
		</>
	);
}

export default App;
