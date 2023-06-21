import { useEffect, useState } from "react";

import Product from "./Product";

const $ = window.$;

/**
 * Init isotope
 */
function initIsotope() {
	if ($(".product_grid").length) {
		$(".product_grid").isotope({
			itemSelector: ".product",
			layoutMode: "fitRows",
			fitRows: {
				gutter: 30,
			},
			animationOptions: {
				duration: 750,
				easing: "linear",
				queue: false,
			},
		});
	}
}

function ProductList(props) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(props.products);
	}, [props.products]);

	useEffect(() => {
		if (products.length > 0) {
			setTimeout(() => {
				initIsotope();
			}, 500);
		}
	}, [products]);

	return (
		<div className="products">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="product_grid">
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

export default ProductList;
