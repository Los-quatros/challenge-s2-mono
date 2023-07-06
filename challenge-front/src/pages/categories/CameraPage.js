import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
import ProductsFilter from "../../components/ProductsFilter";
import cameraBackground from "../../assets/images/categories/cameras/camera_1.png";
import defaultImage from "../../assets/images/categories/default.png";
import { toast } from "react-toastify";

const title = "Nos caméras";
const content = `Découvrez la puissance de la capture avec nos caméras de pointe.
	Offrant une qualité  d'image exceptionnelle et des fonctionnalités avancées,
	elles sont conçues pour répondre aux besoins des photographes et des vidéastes les plus exigeants.
	Faites un pas vers l'excellence photographique avec nos caméras de haute précision.`;

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
	toast[type](message, {
		position: "top-right",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

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
		const token = localStorage.getItem("token");
		const products = [];
		fetch("http://localhost:4000/products", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((data) => {
				if (data) {
					data.forEach((product) => {
						if (product.category.name === "cameras") {
							if (!product?.image) {
								product.image = defaultImage;
							}
							products.push(product);
						}
					});
					setProducts(products);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération des caméras",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération des caméras",
					"error"
				);
			});
	}

	/**
	 * Get products
	 * TODO : Get products from API
	 * TODO : Display toast error if API error
	 */
	// function getProducts() {}

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
					return a.label.localeCompare(b.label);
				})
			);
		} else {
			initProducts();
		}
	}

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
