import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Product(props) {
	const [product, setProduct] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		setProduct(props.product);
	}, [props.product]);

	/**
	 * Redirect to product details page
	 * @param { string } id Product id
	 * @returns Link to product details page
	 */
	const redirectToProductDetails = (id) => {
		navigate(`/products/${product.category}/${id}`, { state: { product } });
	};

	return (
		<>
			<div
				className="product"
				style={{ cursor: "pointer" }}
				onClick={() => redirectToProductDetails(product.id)}
			>
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
		</>
	);
}

export default Product;
