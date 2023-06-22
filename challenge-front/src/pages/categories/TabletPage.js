import { useEffect, useState } from "react";

import Products from "../../pages/Products";
import ProductsFilter from "../../components/ProductsFilter";
import tabletBackground from "../../assets/images/categories/tablets/tablet_1.png";
import tablet_10 from "../../assets/images/categories/tablets/tablet_10.png";
import tablet_11 from "../../assets/images/categories/tablets/tablet_11.png";
import tablet_12 from "../../assets/images/categories/tablets/tablet_12.png";
import tablet_13 from "../../assets/images/categories/tablets/tablet_13.png";
import tablet_2 from "../../assets/images/categories/tablets/tablet_2.png";
import tablet_3 from "../../assets/images/categories/tablets/tablet_3.png";
import tablet_4 from "../../assets/images/categories/tablets/tablet_4.png";
import tablet_5 from "../../assets/images/categories/tablets/tablet_5.png";
import tablet_6 from "../../assets/images/categories/tablets/tablet_6.png";
import tablet_7 from "../../assets/images/categories/tablets/tablet_7.png";
import tablet_8 from "../../assets/images/categories/tablets/tablet_8.png";
import tablet_9 from "../../assets/images/categories/tablets/tablet_9.png";

function TabletPage() {
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
				name: "Tablette Apple iPad Pro",
				price: 999.99,
				image: tablet_2,
			},
			{
				id: 2,
				name: "Tablette Samsung Galaxy Tab S7",
				price: 799.99,
				image: tablet_3,
			},
			{
				id: 3,
				name: "Tablette Microsoft Surface Pro",
				price: 1299.99,
				image: tablet_4,
			},
			{
				id: 4,
				name: "Tablette Lenovo Yoga Tab",
				price: 349.99,
				image: tablet_5,
			},
			{
				id: 5,
				name: "Tablette Huawei MediaPad M6",
				price: 599.99,
				image: tablet_6,
			},
			{
				id: 6,
				name: "Tablette Amazon Fire HD",
				price: 149.99,
				image: tablet_7,
			},
			{
				id: 7,
				name: "Tablette Google Pixel Slate",
				price: 899.99,
				image: tablet_8,
			},
			{
				id: 8,
				name: "Tablette Asus ZenPad",
				price: 299.99,
				image: tablet_9,
			},
			{
				id: 9,
				name: "Tablette Sony Xperia Tablet",
				price: 599.99,
				image: tablet_10,
			},
			{
				id: 10,
				name: "Tablette Dell Latitude",
				price: 1199.99,
				image: tablet_11,
			},
			{
				id: 11,
				name: "Tablette Huawei MatePad Pro",
				price: 699.99,
				image: tablet_12,
			},
			{
				id: 12,
				name: "Tablette Amazon Kindle Paperwhite",
				price: 129.99,
				image: tablet_13,
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

	return (
		<>
			<div className="home">
				<div className="home_container">
					<div
						className="home_background"
						style={{ backgroundImage: `url(${tabletBackground})` }}
					></div>
					<div className="home_content_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_content">
										<div className="home_title ">
											Nos tablettes<span>.</span>
										</div>
										<div className="home_text">
											<p>
												Découvrez notre sélection de tablettes haut de gamme qui
												vous offriront une expérience technologique
												exceptionnelle. Que vous soyez un amateur de
												divertissement, un étudiant ou un professionnel en
												déplacement, nos tablettes sont conçues pour répondre à
												tous vos besoins.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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

export default TabletPage;
