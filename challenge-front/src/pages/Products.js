import { useEffect, useState } from "react";

import Product from "./products/ProductPage";

function Products(props) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(props.products);
	}, [props.products]);

	const productsEmptyStyle = {
		margin: "auto",
		fontSize: "30px",
		fontWeight: "bold",
		fontStyle: "italic",
	};

	return (
		<div className="products">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="product_grid d-flex justify-content-between flex-wrap">
							{products.length === 0 ? (
								<p style={productsEmptyStyle} className="text-dark">
									Aucun produit disponible ...
								</p>
							) : (
								products.map((product, index) => (
									<Product key={index} product={product} />
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;
