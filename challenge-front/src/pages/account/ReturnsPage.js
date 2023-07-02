import SidebarPage from "./SidebarPage";

function ReturnsPage({ accountMenuChange, menu }) {
	/**
	 * Handle the change of the menu in the sidebar
	 * - This function is passed to the SidebarPage component
	 * @param { string } menu Menu name
	 */
	const handleReturnsMenuChange = (menu) => accountMenuChange(menu);

	return (
		<div id="content" className="p-4 p-md-5">
			<SidebarPage sidebarMenuChange={handleReturnsMenuChange} menu={menu} />
			<h2 className="mb-4">Sidebar #04</h2>
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

export default ReturnsPage;
