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
			getSortData: {
				price: function (itemElement) {
					var priceEle = $(itemElement)
						.find(".product_price")
						.text()
						.replace("$", "");
					return parseFloat(priceEle);
				},
				name: ".product_name",
				stars: function (itemElement) {
					var starsEle = $(itemElement).find(".rating");
					var stars = starsEle.attr("data-rating");
					return stars;
				},
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
			initIsotope();
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
