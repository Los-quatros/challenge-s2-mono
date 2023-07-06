import { useEffect, useState } from "react";

import AddressesPage from "./AddressesPage";
import HeaderPage from "./HeaderPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import ReturnsPage from "./ReturnsPage";
import SidebarPage from "./SidebarPage";
import { useParams } from "react-router-dom";

function AccountPage() {
	const [role, setRole] = useState("user");
	const { name } = useParams();
	const [menu, setMenu] = useState("");

	useEffect(() => {
		const role = localStorage.getItem("role");
		if (role) {
			setRole(role);
		}
	}, []);

	useEffect(() => {
		setMenu(name);
	}, [name]);

	return (
		<>
			<div className="wrapper d-flex align-items-stretch">
				<SidebarPage role={role} />
				<div id="content" className="p-4 p-md-5">
					<HeaderPage role={role} />
					{menu === "orders" && <OrdersPage role={role} />}
					{role === "user" && menu === "addresses" && (
						<AddressesPage role={role} />
					)}
					{role === "seller" && menu === "products" && (
						<ProductsPage role={role} />
					)}
					{menu === "returns" && <ReturnsPage role={role} />}
					{menu === "profile" && <ProfilePage role={role} />}
				</div>
			</div>
		</>
	);
}

export default AccountPage;
