const Menu = () => {
	return (
		<div className="menu menu_mm trans_300">
			<div className="menu_container menu_mm">
				<div className="page_menu_content">
					<ul className="page_menu_nav menu_mm">
						<li className="page_menu_item menu_mm">
							<a href="/">Accueil</a>
						</li>
						<li className="page_menu_item has-children menu_mm">
							<a href="/">
								Catégories<i className="fa fa-angle-down"></i>
							</a>
							<ul className="page_menu_selection menu_mm">
								<li className="page_menu_item menu_mm">
									<a href="/">
										Casque<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Tablette<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Téléphone<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Caméra<i className="fa fa-angle-down"></i>
									</a>
								</li>
							</ul>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">Accessoires</a>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">Offres</a>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">Contact</a>
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
