import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainer";
import Products from "../../pages/Products";
import ProductsFilter from "../../components/ProductsFilter";
import headphoneBackground from "../../assets/images/categories/headphones/headphone_1.png";
import headphone_10 from "../../assets/images/categories/headphones/headphone_10.png";
import headphone_11 from "../../assets/images/categories/headphones/headphone_11.png";
import headphone_12 from "../../assets/images/categories/headphones/headphone_12.png";
import headphone_13 from "../../assets/images/categories/headphones/headphone_13.png";
import headphone_2 from "../../assets/images/categories/headphones/headphone_2.png";
import headphone_3 from "../../assets/images/categories/headphones/headphone_3.png";
import headphone_4 from "../../assets/images/categories/headphones/headphone_4.png";
import headphone_5 from "../../assets/images/categories/headphones/headphone_5.png";
import headphone_6 from "../../assets/images/categories/headphones/headphone_6.png";
import headphone_7 from "../../assets/images/categories/headphones/headphone_7.png";
import headphone_8 from "../../assets/images/categories/headphones/headphone_8.png";
import headphone_9 from "../../assets/images/categories/headphones/headphone_9.png";

function HeadPhonePage() {
	const [products, setProducts] = useState([]);
	const [sortBy, setSortBy] = useState("");

	useEffect(() => {
		initProducts();
	}, []);

	useEffect(() => {
		setSortBy(sortBy);
	}, [sortBy]);

	/**
	 * Init products
	 */
	function initProducts() {
		setProducts([
			{
				id: 1,
				name: "Casque sans fil Sony WH-1000XM4",
				price: 349.99,
				image: headphone_2,
			},
			{
				id: 2,
				name: "Casque audio Bose QuietComfort 35 II",
				price: 299.99,
				image: headphone_3,
			},
			{
				id: 3,
				name: "Casque sans fil Apple AirPods Pro",
				price: 249.99,
				image: headphone_4,
			},
			{
				id: 4,
				name: "Casque gaming SteelSeries Arctis 7",
				price: 149.99,
				image: headphone_5,
			},
			{
				id: 5,
				name: "Casque audio Sennheiser HD 660 S",
				price: 499.99,
				image: headphone_6,
			},
			{
				id: 6,
				name: "Casque sans fil JBL E55BT",
				price: 79.99,
				image: headphone_7,
			},
			{
				id: 7,
				name: "Casque audio AKG K240 Studio",
				price: 69.99,
				image: headphone_8,
			},
			{
				id: 8,
				name: "Casque gaming Razer Kraken",
				price: 89.99,
				image: headphone_9,
			},
			{
				id: 9,
				name: "Casque sans fil Beats Solo3",
				price: 199.99,
				image: headphone_10,
			},
			{
				id: 10,
				name: "Casque audio Audio-Technica ATH-M50x",
				price: 149.99,
				image: headphone_11,
			},
			{
				id: 11,
				name: "Casque gaming Logitech G Pro X",
				price: 129.99,
				image: headphone_12,
			},
			{
				id: 12,
				name: "Casque sans fil Jabra Elite 85h",
				price: 299.99,
				image: headphone_13,
			},
		]);
	}

	/**
	 * Get products
	 * TODO : Get products from API
	 * TODO : Display toast error if API error
	 */
	function getProducts() {}

	/**
	 * Handle sort by filter
	 * @param { string } value Filter value
	 */
	function handleSortByFilter(value) {
		setSortBy(value);
		handleProductsFilter(value);
	}

	/**
	 * Sort products by filter
	 * @param { string } value Filter value
	 */
	function handleProductsFilter(value) {
		if (value === "price") {
			setProducts(
				products.sort((a, b) => {
					return a.price - b.price;
				})
			);
		} else if (value === "name") {
			setProducts(
				products.sort((a, b) => {
					return a.name.localeCompare(b.name);
				})
			);
		} else {
			initProducts();
		}
	}

	const title = "Nos casques";
	const content = `Plongez au cœur d'une expérience sonore immersive et
	exceptionnelle avec nos casques de musique haut de gamme. Que vous soyez un audiophile
	passionné ou que vous cherchiez simplement à profiter pleinement de votre
	musique préférée, nos casques vous offriront une qualité audio inégalée.`;

	return (
		<>
			<div className="home">
				<HomeContainer
					image={headphoneBackground}
					title={title}
					content={content}
				/>
			</div>
			{products.length && (
				<ProductsFilter
					pageSize={products.length}
					handleSortByFilter={handleSortByFilter}
					sortBy={sortBy}
				/>
			)}
			<Products products={products} />
		</>
	);
}

export default HeadPhonePage;
