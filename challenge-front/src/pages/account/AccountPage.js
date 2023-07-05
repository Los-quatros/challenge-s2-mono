import { useEffect, useState } from "react";

import AddressesPage from "./AddressesPage";
import HeaderPage from "./HeaderPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import ReturnsPage from "./ReturnsPage";
import SidebarPage from "./SidebarPage";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

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

function AccountPage() {
	const { name } = useParams();
	const [menu, setMenu] = useState("");
	const [userRole, setUserRole] = useState("user");

	useEffect(() => {
		setMenu(name);
	}, [name]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/users/${decodedToken.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((data) => {
				if (data) {
					const role = (data && data.roles) || "user";
					setUserRole(role);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération de vos informations",
						"error"
					);
				}
			})
			.catch(() =>
				setToast(
					"Une erreur est survenue lors de la récupération de vos informations",
					"error"
				)
			);
	}, []);

	return (
		<>
			<div className="wrapper d-flex align-items-stretch">
				<SidebarPage role={userRole} />
				<div id="content" className="p-4 p-md-5">
					<HeaderPage role={userRole} />
					{menu === "orders" && <OrdersPage role={userRole} />}
					{userRole === "user" && menu === "addresses" && (
						<AddressesPage role={userRole} />
					)}
					{userRole === "seller" && menu === "products" && (
						<ProductsPage role={userRole} />
					)}
					{menu === "returns" && <ReturnsPage role={userRole} />}
					{menu === "profile" && <ProfilePage role={userRole} />}
				</div>
			</div>
		</>
	);
}

export default AccountPage;
