import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
import ProductsFilter from "../../components/ProductsFilter";
import defaultImage from "../../assets/images/categories/default.png";
import tabletBackground from "../../assets/images/categories/tablets/tablet_1.png";
import { toast } from "react-toastify";

const title = "Nos caméras";
const content = `Découvrez notre sélection de tablettes haut de gamme qui
	vous offriront une expérience technologique exceptionnelle. Que vous soyez un amateur de
	divertissement, un étudiant ou un professionnel en déplacement, nos tablettes sont conçues pour répondre à
	tous vos besoins.`;

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
						if (product.category.name === "phones") {
							if (!product?.image) {
								product.image = defaultImage;
							}
							products.push(product);
						}
					});
					setProducts(products);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération des téléphones",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération des téléphones",
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
					image={tabletBackground}
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

export default TabletPage;
