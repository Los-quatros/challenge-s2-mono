import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useEffect } from "react";

const $ = window.$;

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

function SidebarPage({ sidebarMenuChange, menu }) {
	const navigate = useNavigate();

	/**
	 * Logout the user
	 * @param { Event } event Click event
	 */
	const logout = (event) => {
		event.preventDefault();
		localStorage.removeItem("token");
		navigate("/");
		setTimeout(() => {
			setToast("Vous avez été déconnecté", "success");
		}, 500);
	};

	/**
	 * Handle sidebar menu change
	 * - Emit event to parent component
	 * @param { string } menu Sidebar menu name
	 */
	const handleSidebarMenuChange = (menu) => {
		document.querySelectorAll("#navbar li").forEach((link) => {
			link.classList.remove("active");
			if (link.classList.contains(menu)) {
				link.classList.add("active");
			}
		});
		sidebarMenuChange(menu);
	};

	useEffect(() => {
		document.querySelectorAll("#navbar li").forEach((link) => {
			link.classList.remove("active");
			if (link.classList.contains(menu)) {
				link.classList.add("active");
			}
		});
	}, [menu]);

	/**
	 * Toggle sidebar
	 */
	const toggleSidebar = () => $("#sidebar").toggleClass("active");

	return (
		<>
			<ToastContainer />
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<button
						type="button"
						id="sidebarCollapse"
						className="btn btn-primary"
						onClick={toggleSidebar}
					>
						<i className="fa fa-bars"></i>
						<span className="sr-only">Burger menu</span>
					</button>
					<button
						className="btn btn-dark d-inline-block d-lg-none ml-auto"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Burger menu"
					>
						<i className="fa fa-bars"></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="nav navbar-nav ml-auto" id="navbar">
							<li
								className="nav-item active profile"
								onClick={() => handleSidebarMenuChange("profile")}
							>
								<Link className="nav-link">Profil</Link>
							</li>
							<li
								className="nav-item orders"
								onClick={() => handleSidebarMenuChange("orders")}
							>
								<Link className="nav-link">Mes commandes</Link>
							</li>
							<li
								className="nav-item addresses"
								onClick={() => handleSidebarMenuChange("addresses")}
							>
								<Link className="nav-link">Mes adresses</Link>
							</li>
							<li
								className="nav-item returns"
								onClick={() => handleSidebarMenuChange("returns")}
							>
								<Link className="nav-link">Mes retours</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" onClick={logout}>
									Déconnexion
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default SidebarPage;
