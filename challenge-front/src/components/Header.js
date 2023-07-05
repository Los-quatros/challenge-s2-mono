import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { gsap } from "gsap";
import { toast } from "react-toastify";

const $ = window.$;

/**
 * Handle link click to prevent page reload
 * @param { Event } event Click event
 */
const handleLinkClick = (event) => event.preventDefault();

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
	toast[type](message, {
		position: "top-right",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

/**
 * Expand submenus of menu in mobile device
 * @param { Event } event Click event
 */
const expandSubmenusFromMenu = (event) => {
	event.preventDefault();
	event.stopPropagation();
	const subItem = $(event.currentTarget).find("> ul");
	if (subItem.hasClass("active")) {
		subItem.toggleClass("active");
		gsap.to(subItem, { duration: 0, height: 0 });
	} else {
		subItem.toggleClass("active");
		gsap.to(subItem, { height: "auto" });
		gsap.to(subItem, { duration: 0, height: 0 });
	}
};

const Header = ({ quantity }) => {
	const [menuActive, setMenuActive] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(0);
	const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setCartQuantity(quantity);
	}, [quantity]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLogged(true);
		}
	}, []);

	/**
	 * Logout the user
	 * @param { Event } event Click event
	 */
	const logout = (event) => {
		event.preventDefault();
		localStorage.removeItem("token");
		closeMenu();
		setIsLogged(false);
		navigate("/");
		setTimeout(() => {
			setToast("Vous avez été déconnecté", "success");
		}, 500);
	};

	/**
	 * Handle hamburger click
	 * @param { Event } event Click event
	 */
	const handleHamburgerClick = (event) => {
		event.stopPropagation();
		if (!menuActive) {
			openMenu();
		} else {
			closeMenu();
		}
	};

	/**
	 * Close burger menu
	 */
	const closeMenu = () => {
		$(".menu").removeClass("active");
		setMenuActive(false);
	};

	/**
	 * Open burger menu
	 */
	const openMenu = () => {
		$(".menu").addClass("active");
		setMenuActive(true);
	};

	return (
		<>
			<header className="header">
				<div className="header_container">
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="header_content d-flex flex-row align-items-center justify-content-start">
									<div className="logo">
										<Link to="/">ElecShop.</Link>
									</div>
									<nav className="main_nav">
										<ul className="mb-0">
											<li className="active">
												<Link to="/">Accueil</Link>
											</li>
											<li className="hassubs">
												<Link onClick={handleLinkClick}>Catégories</Link>
												<ul>
													<li>
														<Link to="/categories/headphones">Casque</Link>
													</li>
													<li>
														<Link to="/categories/tablets">Tablette</Link>
													</li>
													<li>
														<Link to="/categories/phones">Téléphone</Link>
													</li>
													<li>
														<Link to="/categories/cameras">Caméra</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to="/contact">Contact</Link>
											</li>
											{!isLogged && (
												<li>
													<Link to="/register/seller">Vendeur</Link>
												</li>
											)}
											{isLogged && (
												<li>
													<Link to="/account/profile">Compte</Link>
												</li>
											)}
											{!isLogged && (
												<li>
													<Link to="/login">Connexion</Link>
												</li>
											)}
											{isLogged && (
												<li>
													<Link onClick={logout}>Déconnexion</Link>
												</li>
											)}
										</ul>
									</nav>
									<div className="header_extra ml-auto">
										<div className="shopping_cart">
											<Link to="/cart">
												<svg
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													xmlnsXlink="http://www.w3.org/1999/xlink"
													x="0px"
													y="0px"
													viewBox="0 0 489 489"
													style={{ enableBackground: "new 0 0 489 489" }}
													xmlSpace="preserve"
												>
													<g>
														<path
															d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3
                      c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1
                      C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462
                      H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41
                      c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"
														/>
													</g>
												</svg>
												<div>
													Panier <span>({cartQuantity})</span>
												</div>
											</Link>
										</div>
										<div
											className="hamburger"
											onClick={(event) => handleHamburgerClick(event)}
										>
											<i className="fa fa-bars" aria-hidden="true"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className="menu menu_mm trans_300">
				<div className="menu_container menu_mm">
					<div className="page_menu_content">
						<ul className="page_menu_nav menu_mm">
							<li className="page_menu_item menu_mm" onClick={closeMenu}>
								<Link to="/">Accueil</Link>
							</li>
							<li
								className="page_menu_item has-children menu_mm"
								onClick={expandSubmenusFromMenu}
							>
								<Link onClick={handleLinkClick}>
									Catégories<i className="fa fa-angle-down"></i>
								</Link>
								<ul className="page_menu_selection menu_mm">
									<li className="page_menu_item menu_mm" onClick={closeMenu}>
										<Link to="/categories/headphones">Casque</Link>
									</li>
									<li className="page_menu_item menu_mm" onClick={closeMenu}>
										<Link to="/categories/tablets">Tablette</Link>
									</li>
									<li className="page_menu_item menu_mm" onClick={closeMenu}>
										<Link to="/categories/phones">Téléphone</Link>
									</li>
									<li className="page_menu_item menu_mm" onClick={closeMenu}>
										<Link to="/categories/cameras">Caméra</Link>
									</li>
								</ul>
							</li>
							<li className="page_menu_item menu_mm" onClick={closeMenu}>
								<Link to="/contact">Contact</Link>
							</li>
							{isLogged && (
								<li className="page_menu_item menu_mm">
									<Link to="/account/profile">Compte</Link>
								</li>
							)}
							{!isLogged && (
								<li className="page_menu_item menu_mm">
									<Link to="/register/seller">Vendeur</Link>
								</li>
							)}
							{!isLogged && (
								<li className="page_menu_item menu_mm">
									<Link to="/login">Connexion</Link>
								</li>
							)}
							{isLogged && (
								<li className="page_menu_item menu_mm">
									<Link onClick={logout}>Déconnexion</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="menu_close" onClick={closeMenu}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
			</div>
		</>
	);
};

export default Header;
