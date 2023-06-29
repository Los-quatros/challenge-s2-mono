import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import AddressesPage from "./AddressesPage";
import OrdersPage from "./OrdersPage";
import ProfilePage from "./ProfilePage";
import ReturnsPage from "./ReturnsPage";
import profileImage from "../../assets/images/account/profile.png";

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

const handleLinkClick = (e) => e.preventDefault();

function AccountPage() {
	const navigate = useNavigate();
	const { name } = useParams();
	const [menu, setMenu] = useState("profile");

	useEffect(() => {
		setMenu(name);
	}, [name]);

	/**
	 * Logout the user
	 * @param { Event } event Click event
	 */
	const logout = (event) => {
		event.preventDefault();
		localStorage.removeItem("token");
		navigate("/");
		setMenu("profile");
		setTimeout(() => {
			setToast("Vous avez été déconnecté", "success");
		}, 500);
	};

	/**
	 * Triggered when the menu changes
	 * @param { Event } event Click event
	 * @param { string } menu Menu name
	 */
	const accountMenuChange = (event, menu) => {
		event.preventDefault();
		setMenu(menu);
		const menuItems = document.querySelectorAll(".list-unstyled.components li");
		menuItems.forEach((item) => item.classList.remove("active"));
		$(`li.${menu}`).addClass("active");
	};

	return (
		<>
			<ToastContainer />
			<div className="wrapper d-flex align-items-stretch">
				<nav id="sidebar">
					<div className="p-4 pt-5">
						<Link
							to="/"
							className="img logo rounded-circle mb-5"
							style={{ backgroundImage: `url(${profileImage})` }}
						></Link>
						<ul className="list-unstyled components mb-5">
							<li className="profile active">
								<Link onClick={(event) => accountMenuChange(event, "profile")}>
									Profil
								</Link>
							</li>
							<li className="orders">
								<Link
									onClick={(event) => accountMenuChange(event, "orders")}
									to="/account/orders"
								>
									Mes commandes
								</Link>
							</li>
							<li className="addresses">
								<Link
									onClick={(event) => accountMenuChange(event, "addresses")}
									to="/account/addresses"
								>
									Mes adresses
								</Link>
							</li>
							<li className="returns">
								<Link
									onClick={(event) => accountMenuChange(event, "returns")}
									to="/account/returns"
								>
									Mes retours
								</Link>
							</li>
							<li>
								<Link onClick={logout}>Déconnexion</Link>
							</li>
						</ul>
					</div>
				</nav>
				{menu === "orders" ? (
					<OrdersPage accountMenuChange={accountMenuChange} menu={menu} />
				) : menu === "addresses" ? (
					<AddressesPage accountMenuChange={accountMenuChange} menu={menu} />
				) : menu === "returns" ? (
					<ReturnsPage accountMenuChange={accountMenuChange} menu={menu} />
				) : (
					<ProfilePage accountMenuChange={accountMenuChange} menu={menu} />
				)}
			</div>
		</>
	);
}

export default AccountPage;
