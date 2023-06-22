import "../assets/styles/home/home.css";
import "../assets/styles/home/responsive.css";

import { useEffect, useState } from "react";

import AdvertisementProductPage from "./home/AdvertisementProductPage";
import AdvertisementProductsPage from "./home/AdvertisementProductsPage";
import BoxesPage from "./home/BoxesPage";
import HomeSliderPage from "./home/HomeSliderPage";
import Products from "./Products";
import image1 from "../assets/images/home/products/product_1.png";
import image2 from "../assets/images/home/products/product_2.png";
import image3 from "../assets/images/home/products/product_3.png";
import image4 from "../assets/images/home/products/product_4.png";

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
				name: "Casque Sony",
				price: 299.99,
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
			<AdvertisementProductsPage />
			<Products products={products} />
			<BoxesPage />
			<AdvertisementProductPage />
		</>
	);
}

export default HomePage;
