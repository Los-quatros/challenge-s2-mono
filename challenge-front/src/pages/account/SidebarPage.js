import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import profileImage from "../../assets/images/account/profile.png";

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
		closeOnClick: false,
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

	return (
		<>
			<ToastContainer />
			<nav id="sidebar">
				<div className="p-4 pt-5">
					<Link
						to="/"
						className="img logo rounded-circle mb-5"
						style={{ backgroundImage: `url(${profileImage})` }}
					></Link>
					<ul className="list-unstyled components mb-5">
						<li className="profile active" id="account-profile">
							<Link to="/account/profile">Profil</Link>
						</li>
						<li className="orders" id="account-orders">
							<Link to="/account/orders">Mes commandes</Link>
						</li>
						<li className="addresses" id="account-addresses">
							<Link to="/account/addresses">Mes adresses</Link>
						</li>
						<li className="returns" id="account-returns">
							<Link to="/account/returns">Mes retours</Link>
						</li>
						<li>
							<Link onClick={logout}>Déconnexion</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default SidebarPage;
