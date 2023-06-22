import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<div className="menu menu_mm trans_300">
			<div className="menu_container menu_mm">
				<div className="page_menu_content">
					<ul className="page_menu_nav menu_mm">
						<li className="page_menu_item menu_mm">
							<Link to="/">Accueil</Link>
						</li>
						<li className="page_menu_item has-children menu_mm">
							<a href="/">
								Catégories<i className="fa fa-angle-down"></i>
							</a>
							<ul className="page_menu_selection menu_mm">
								<li className="page_menu_item menu_mm">
									<Link to="/categories/headphones">Casque</Link>
								</li>
								<li className="page_menu_item menu_mm">
									<Link to="/categories/tablets">Tablette</Link>
								</li>
								<li className="page_menu_item menu_mm">
									<Link to="/categories/phones">Téléphone</Link>
								</li>
								<li className="page_menu_item menu_mm">
									<Link to="/categories/cameras">Caméra</Link>
								</li>
							</ul>
						</li>
						<li className="page_menu_item menu_mm">
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="menu_close">
				<i className="fa fa-times" aria-hidden="true"></i>
			</div>
		</div>
	);
};

export default Menu;
