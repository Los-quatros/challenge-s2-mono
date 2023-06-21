const Menu = () => {
	return (
		<div className="menu menu_mm trans_300">
			<div className="menu_container menu_mm">
				<div className="page_menu_content">
					<ul className="page_menu_nav menu_mm">
						<li className="page_menu_item has-children menu_mm">
							<a href="/">
								Accueil<i className="fa fa-angle-down"></i>
							</a>
							<ul className="page_menu_selection menu_mm">
								<li className="page_menu_item menu_mm">
									<a href="/">
										Catégories<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Produits<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Panier<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Paiement<i className="fa fa-angle-down"></i>
									</a>
								</li>
								<li className="page_menu_item menu_mm">
									<a href="/">
										Contact<i className="fa fa-angle-down"></i>
									</a>
								</li>
							</ul>
						</li>
						<li className="page_menu_item has-children menu_mm">
							<a href="/">
								Catégories<i className="fa fa-angle-down"></i>
							</a>
							<ul className="page_menu_selection menu_mm">
								<li className="page_menu_item menu_mm">
									<a href="/">
										Souris<i className="fa fa-angle-down"></i>
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
										Cable<i className="fa fa-angle-down"></i>
									</a>
								</li>
							</ul>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">
								Accessoires<i className="fa fa-angle-down"></i>
							</a>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">
								Offres<i className="fa fa-angle-down"></i>
							</a>
						</li>
						<li className="page_menu_item menu_mm">
							<a href="/">
								Contact<i className="fa fa-angle-down"></i>
							</a>
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
