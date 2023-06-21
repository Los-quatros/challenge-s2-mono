import "../assets/styles/home/main.css";
import "../assets/styles/home/responsive.css";

import { useEffect, useState } from "react";

import AdvertisementPage from "./home/AdvertisementPage";
import HomeSliderPage from "./home/HomeSliderPage";
import ProductList from "../components/ProductList";
import image1 from "../assets/images/home/products/product_1.jpg";
import image2 from "../assets/images/home/products/product_2.jpg";
import image3 from "../assets/images/home/products/product_3.jpg";
import image4 from "../assets/images/home/products/product_4.jpg";

function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		initProducts();
	}, []);

	/**
	 * Init products
	 */
	function initProducts() {
		setProducts([
			{
				id: 1,
				name: "Iphone X 64 Go",
				price: 1399.99,
				image: image1,
			},
			{
				id: 2,
				name: "Caméra Dg HSM",
				price: 799.99,
				image: image2,
			},
			{
				id: 3,
				name: "Souris Logitech",
				price: 29.99,
				image: image3,
			},
			{
				id: 4,
				name: "Tablette Apple",
				price: 499.99,
				image: image4,
			},
		]);
	}

	return (
		<>
			<HomeSliderPage />
			<AdvertisementPage />
			<ProductList products={products} />
		</>
	);
}

export default HomePage;
