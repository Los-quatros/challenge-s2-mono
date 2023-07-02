import SidebarPage from "./HeaderPage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

/**
 * Reset and set active link in li element
 * @param { string } name Account menu name
 */
const resetAndSetActiveLink = (name) => {
	document
		.querySelector(".list-unstyled")
		.querySelectorAll("li")
		.forEach((li) => li.classList.remove("active"));
	document.querySelector(`#account-${name}`).classList.add("active");
};

function OrdersPage() {
	const { name } = useParams();

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	return (
		<div id="content" className="p-4 p-md-5">
			<SidebarPage />
			<h2 className="mb-4">Sidebar #02</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
		</div>
	);
}

export default OrdersPage;
