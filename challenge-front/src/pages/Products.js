import { useEffect, useState } from "react";

import Product from "./products/ProductPage";

function Products(props) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(props.products);
	}, [props.products]);

	return (
		<div className="products">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="product_grid d-flex justify-content-between flex-wrap">
							{products.map((product, index) => (
								<Product key={index} product={product} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;
