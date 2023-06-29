import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

function SidebarPage() {
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
						<ul className="nav navbar-nav ml-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="">
									Profil
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="">
									Mes commandes
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="">
									Mes adresses
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="">
									Mes retours
								</Link>
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
