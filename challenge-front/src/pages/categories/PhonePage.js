import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainer";
import Products from "../../pages/Products";
import ProductsFilter from "../../components/ProductsFilter";
import phoneBackground from "../../assets/images/categories/phones/phone_1.png";
import phone_10 from "../../assets/images/categories/phones/phone_10.png";
import phone_11 from "../../assets/images/categories/phones/phone_11.png";
import phone_12 from "../../assets/images/categories/phones/phone_12.png";
import phone_13 from "../../assets/images/categories/phones/phone_13.png";
import phone_2 from "../../assets/images/categories/phones/phone_2.png";
import phone_3 from "../../assets/images/categories/phones/phone_3.png";
import phone_4 from "../../assets/images/categories/phones/phone_4.png";
import phone_5 from "../../assets/images/categories/phones/phone_5.png";
import phone_6 from "../../assets/images/categories/phones/phone_6.png";
import phone_7 from "../../assets/images/categories/phones/phone_7.png";
import phone_8 from "../../assets/images/categories/phones/phone_8.png";
import phone_9 from "../../assets/images/categories/phones/phone_9.png";

function PhonePage() {
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
				name: "iPhone 13 Pro",
				price: 1199.99,
				image: phone_2,
			},
			{
				id: 2,
				name: "Samsung Galaxy S21 Ultra",
				price: 1099.99,
				image: phone_3,
			},
			{
				id: 3,
				name: "Google Pixel 6 Pro",
				price: 999.99,
				image: phone_4,
			},
			{
				id: 4,
				name: "OnePlus 9 Pro",
				price: 899.99,
				image: phone_5,
			},
			{
				id: 5,
				name: "Xiaomi Mi 11",
				price: 799.99,
				image: phone_6,
			},
			{
				id: 6,
				name: "Sony Xperia 1 III",
				price: 1099.99,
				image: phone_7,
			},
			{
				id: 7,
				name: "iPhone SE",
				price: 499.99,
				image: phone_8,
			},
			{
				id: 8,
				name: "Samsung Galaxy Note 20 Ultra",
				price: 1099.99,
				image: phone_9,
			},
			{
				id: 9,
				name: "Google Pixel 5a",
				price: 599.99,
				image: phone_10,
			},
			{
				id: 10,
				name: "OnePlus 9",
				price: 699.99,
				image: phone_11,
			},
			{
				id: 11,
				name: "Xiaomi Mi 11 Lite",
				price: 499.99,
				image: phone_12,
			},
			{
				id: 12,
				name: "Sony Xperia 5 III",
				price: 999.99,
				image: phone_13,
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

	const title = "Nos téléphones";
	const content = `Découvrez notre téléphone révolutionnaire, alliant style
		et fonctionnalités avancées ! Son design élégant et ergonomique captivera votre regard dès le premier
		instant. Plongez dans une expérience immersive grâce à son écran haute résolution, offrant des couleurs vives
		et un contraste saisissant. Vous ne pourrez plus détacher vos yeux de ce spectacle visuel captivant.`;

	return (
		<>
			<div className="home">
				<HomeContainer
					image={phoneBackground}
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

export default PhonePage;
