import { useEffect, useState } from "react";

function ProductsFilter(props) {
	const [pageSize, setPageSize] = useState(0);
	const [sortBy, setSortBy] = useState("");

	useEffect(() => {
		setPageSize(props.pageSize);
	}, [props.pageSize]);

	useEffect(() => {
		setSortBy(props.sortBy);
		getSortByFilterName(props.sortBy);
	}, [props.sortBy]);

	/**
	 * Get filter name according to filter selected
	 * @param { string } value Filter name
	 * @returns Filter name
	 */
	const getSortByFilterName = (value) => {
		switch (value) {
			case "default":
				setSortBy("Par défaut");
				break;
			case "price":
				setSortBy("Prix");
				break;
			case "name":
				setSortBy("Nom");
				break;
			default:
				setSortBy("Trier par");
		}
	};

	/**
	 * Trigger on each filter changes
	 * - Emit event to parent component
	 * @param { string } value Filter name
	 */
	const onFilterChanges = (value) => {
		setSortBy(value);
		props.handleSortByFilter(value);
	};

	return (
		<div className="products">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="sorting_bar d-flex flex-md-row flex-column align-items-md-center justify-content-md-start">
							<div className="results">
								Affichage de <span>{pageSize}</span> produits
							</div>
							<div className="sorting_container ml-md-auto">
								<div className="sorting">
									<ul className="item_sorting">
										<li>
											<span className="sorting_text">{sortBy}</span>
											<i className="fa fa-chevron-down" aria-hidden="true"></i>
											<ul>
												<li
													className="product_sorting_btn"
													onClick={() => onFilterChanges("default")}
												>
													<span>Par défaut</span>
												</li>
												<li
													className="product_sorting_btn"
													onClick={() => onFilterChanges("price")}
												>
													<span>Prix</span>
												</li>
												<li
													className="product_sorting_btn"
													onClick={() => onFilterChanges("name")}
												>
													<span>Nom</span>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsFilter;
