import "../assets/styles/home/main.css";
import "../assets/styles/home/responsive.css";

import { useEffect, useState } from "react";

function Product(props) {
	const [product, setProduct] = useState({});

	useEffect(() => {
		setProduct(props.product);
	}, [props.product]);

	return (
		<div className="product">
			<div className="product_image">
				<img src={product.image} alt={product.name} />
			</div>
			<div className="product_content">
				<div className="product_title">
					<a href="/">{product.name}</a>
				</div>
				<div className="product_price">{product.price} €</div>
			</div>
		</div>
	);
}

export default Product;
