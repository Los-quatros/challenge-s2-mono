import { useEffect, useState } from "react";

import AdvertisementProductPage from "./home/AdvertisementProductPage";
import AdvertisementProductsPage from "./home/AdvertisementProductsPage";
import BoxesPage from "./home/BoxesPage";
import HomeSliderPage from "./home/HomeSliderPage";
import Products from "./ProductsPage";
import image1 from "../assets/images/home/products/product_1.png";
import image2 from "../assets/images/home/products/product_2.png";
import image3 from "../assets/images/home/products/product_3.png";
import image4 from "../assets/images/home/products/product_4.png";

function HomePage({ handleCartChange }) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		initProducts();
	}, []);

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		if (!cart) {
			handleCartChange();
		}
	});

	/**
	 * Init products
	 */
	function initProducts() {
		setProducts([
			{
				id: 1,
				label: "Iphone X 64 Go",
				price: 1399.99,
				image: image1,
				category: "phones",
				description: `Le iPhone X 64 Go est un smartphone haut de gamme qui offre des
					performances exceptionnelles. Avec son écran OLED de qualité supérieure, son appareil photo
					avancé et sa puissante puce A11 Bionic, cet iPhone vous permettra de profiter d'une expérience
					mobile de premier ordre. Stockez vos photos, vidéos et applications préférées grâce à sa capacité de 64 Go.`,
			},
			{
				id: 2,
				label: "Caméra Dg HSM",
				price: 799.99,
				image: image2,
				category: "cameras",
				description: `La Caméra Dg HSM est un choix parfait pour les amateurs de photographie. Avec son objectif de haute
					qualité et sa technologie avancée, elle vous permet de capturer des images nettes et détaillées. Que vous soyez
					un photographe professionnel ou passionné, cette caméra vous offre des fonctionnalités polyvalentes et une excellente performance.`,
			},
			{
				id: 3,
				label: "Casque Sony",
				price: 299.99,
				image: image3,
				category: "headphones",
				description: `Le casque Sony est conçu pour offrir une expérience sonore immersive. Doté d'une qualité audio
					exceptionnelle, il vous permet de profiter pleinement de votre musique, de vos films et de vos jeux préférés.
					Son design confortable et ses fonctionnalités avancées en font un choix idéal pour les audiophiles exigeants.`,
			},
			{
				id: 4,
				label: "Tablette Apple",
				price: 499.99,
				image: image4,
				category: "tablets",
				description: `La tablette Apple est un appareil polyvalent qui combine la portabilité d'un smartphone avec les
					fonctionnalités d'un ordinateur portable. Avec son écran tactile réactif, sa puissance de traitement et sa
					grande capacité de stockage, cette tablette vous permet de rester productif et de vous divertir où que vous
					soyez. Découvrez une expérience utilisateur fluide et une large gamme d'applications adaptées à vos besoins.`,
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
