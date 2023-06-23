import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainer";
import Products from "../../pages/Products";
import ProductsFilter from "../../components/ProductsFilter";
import cameraBackground from "../../assets/images/categories/cameras/camera_1.png";
import camera_10 from "../../assets/images/categories/cameras/camera_10.png";
import camera_11 from "../../assets/images/categories/cameras/camera_11.png";
import camera_12 from "../../assets/images/categories/cameras/camera_12.png";
import camera_13 from "../../assets/images/categories/cameras/camera_13.png";
import camera_2 from "../../assets/images/categories/cameras/camera_2.png";
import camera_3 from "../../assets/images/categories/cameras/camera_3.png";
import camera_4 from "../../assets/images/categories/cameras/camera_4.png";
import camera_5 from "../../assets/images/categories/cameras/camera_5.png";
import camera_6 from "../../assets/images/categories/cameras/camera_6.png";
import camera_7 from "../../assets/images/categories/cameras/camera_7.png";
import camera_8 from "../../assets/images/categories/cameras/camera_8.png";
import camera_9 from "../../assets/images/categories/cameras/camera_9.png";

function CameraPage() {
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
				name: "Canon EOS 5D Mark IV",
				price: 2499.99,
				image: camera_2,
			},
			{
				id: 2,
				name: "Nikon D850",
				price: 2999.99,
				image: camera_3,
			},
			{
				id: 3,
				name: "Sony Alpha A7 III",
				price: 1999.99,
				image: camera_4,
			},
			{
				id: 4,
				name: "Fujifilm X-T4",
				price: 1699.99,
				image: camera_5,
			},
			{
				id: 5,
				name: "Panasonic Lumix GH5",
				price: 1799.99,
				image: camera_6,
			},
			{
				id: 6,
				name: "Olympus OM-D E-M1 Mark III",
				price: 1799.99,
				image: camera_7,
			},
			{
				id: 7,
				name: "Canon EOS R6",
				price: 2499.99,
				image: camera_8,
			},
			{
				id: 8,
				name: "Nikon Z6 II",
				price: 2299.99,
				image: camera_9,
			},
			{
				id: 9,
				name: "Sony Cyber-shot RX100 VII",
				price: 1299.99,
				image: camera_10,
			},
			{
				id: 10,
				name: "Fujifilm X100V",
				price: 1399.99,
				image: camera_11,
			},
			{
				id: 11,
				name: "Panasonic Lumix S5",
				price: 1999.99,
				image: camera_12,
			},
			{
				id: 12,
				name: "Olympus PEN-F",
				price: 1199.99,
				image: camera_13,
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

	const title = "Nos caméras";
	const content = `Découvrez la puissance de la capture avec nos caméras de pointe.
		Offrant une qualité  d'image exceptionnelle et des fonctionnalités avancées,
		elles sont conçues pour répondre aux besoins des photographes et des vidéastes les plus exigeants.
		Faites un pas vers l'excellence photographique avec nos caméras de haute précision.`;

	return (
		<>
			<div className="home">
				<HomeContainer
					image={cameraBackground}
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

export default CameraPage;
