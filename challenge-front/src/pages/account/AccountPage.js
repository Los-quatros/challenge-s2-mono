import { useEffect, useState } from "react";

import AddressesPage from "./AddressesPage";
import OrdersPage from "./OrdersPage";
import ProfilePage from "./ProfilePage";
import ReturnsPage from "./ReturnsPage";
import SidebarPage from "./SidebarPage";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

function AccountPage() {
	const { name } = useParams();
	const [menu, setMenu] = useState("profile");

	useEffect(() => {
		setMenu(name);
	}, [name]);

	return (
		<>
			<ToastContainer />
			<div className="wrapper d-flex align-items-stretch">
				<SidebarPage />
				{menu === "orders" ? (
					<OrdersPage />
				) : menu === "addresses" ? (
					<AddressesPage />
				) : menu === "returns" ? (
					<ReturnsPage />
				) : (
					<ProfilePage />
				)}
			</div>
		</>
	);
}

export default AccountPage;
