import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
import ProductsFilter from "../../components/ProductsFilter";
import defaultImage from "../../assets/images/categories/default-large.png";
import headphoneBackground from "../../assets/images/categories/headphones/headphone_1.png";
import { toast } from "react-toastify";

const title = "Nos casques";
const content = `Plongez au cœur d'une expérience sonore immersive et
exceptionnelle avec nos casques de musique haut de gamme. Que vous soyez un audiophile
passionné ou que vous cherchiez simplement à profiter pleinement de votre
musique préférée, nos casques vous offriront une qualité audio inégalée.`;

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
		const token = localStorage.getItem("token");
		const products = [];
		fetch(`${process.env.REACT_APP_BASE_API_URL}/products`, {
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
						if (product.category.name === "headphones") {
							if (!product?.image) {
								product.image = defaultImage;
							}
							products.push(product);
						}
					});
					setProducts(products);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération des casques de musique",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération des casques de musique",
					"error"
				);
			});
	}

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
