import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
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
				category: "phones",
				description: `L'iPhone 13 Pro est le dernier fleuron d'Apple, offrant des performances exceptionnelles et des
					fonctionnalités avancées. Avec son écran Super Retina XDR, sa puce A15 Bionic et son système de caméra triple,
					il offre une expérience utilisateur immersive et des photos de qualité professionnelle. Profitez d'une connectivité
					ultra-rapide, d'une autonomie prolongée et de fonctionnalités innovantes telles que la 5G, Face ID et MagSafe.`,
			},
			{
				id: 2,
				name: "Samsung Galaxy S21 Ultra",
				price: 1099.99,
				image: phone_3,
				category: "phones",
				description: `Le Samsung Galaxy S21 Ultra est un smartphone haut de gamme doté d'un écran Dynamic AMOLED 2X de 6,8 pouces,
					d'un processeur Exynos 2100 ou Snapdragon 888, et d'un système de caméra quad haute résolution. Avec sa connectivité 5G,
					sa grande capacité de stockage et sa batterie longue durée, il offre des performances exceptionnelles pour la navigation,
					le multitâche et la photographie. Découvrez une expérience mobile avancée avec le Galaxy S21 Ultra.`,
			},
			{
				id: 3,
				name: "Google Pixel 6 Pro",
				price: 999.99,
				image: phone_4,
				category: "phones",
				description: `Le Google Pixel 6 Pro est un téléphone puissant qui combine des fonctionnalités avancées et une expérience
					Android pure. Avec son écran OLED de 6,7 pouces, son processeur Google Tensor et son système de caméra amélioré,
					il offre des performances exceptionnelles en matière de photographie et de traitement d'image. Profitez d'une
					connectivité rapide, d'une intégration transparente avec les services Google et d'une autonomie de batterie fiable avec le Pixel 6 Pro.`,
			},
			{
				id: 4,
				name: "OnePlus 9 Pro",
				price: 899.99,
				image: phone_5,
				category: "phones",
				description: `Le OnePlus 9 Pro est un smartphone haut de gamme qui allie design élégant, performances exceptionnelles et
					expérience logicielle fluide. Avec son écran Fluid AMOLED de 6,7 pouces, son processeur Snapdragon 888 et son système de
					caméra Hasselblad, il offre des images époustouflantes, une connectivité 5G rapide et une autonomie de batterie fiable.
					Découvrez la puissance et l'innovation avec le OnePlus 9 Pro.`,
			},
			{
				id: 5,
				name: "Xiaomi Mi 11",
				price: 799.99,
				image: phone_6,
				category: "phones",
				description: `Le Xiaomi Mi 11 est un téléphone phare qui associe des performances de pointe, un design élégant et une interface
					utilisateur fluide. Avec son écran AMOLED de 6,81 pouces, son processeur Snapdragon 888 et son système de caméra triple,
					il offre une expérience visuelle immersive, des performances rapides et des photos de qualité professionnelle.
					Profitez d'une connectivité 5G rapide, d'une autonomie de batterie fiable et d'une charge sans fil rapide avec le Mi 11.`,
			},
			{
				id: 6,
				name: "Sony Xperia 1 III",
				price: 1099.99,
				image: phone_7,
				category: "phones",
				description: `Le Sony Xperia 1 III est un téléphone haut de gamme qui combine performances exceptionnelles, technologie
					d'affichage avancée et fonctionnalités photographiques professionnelles. Avec son écran OLED 4K HDR de 6,5 pouces,
					son processeur Snapdragon 888 et son système de caméra ZEISS à triple objectif, il offre des images détaillées, des performances fluides et une expérience multimédia immersive. Découvrez un téléphone conçu pour les amateurs de photographie et les utilisateurs exigeants.`,
			},
			{
				id: 7,
				name: "iPhone SE",
				price: 499.99,
				image: phone_8,
				category: "phones",
				description: `L'iPhone SE est un téléphone compact qui offre des performances puissantes dans un format portable.
					Avec son écran Retina HD de 4,7 pouces, sa puce A13 Bionic et son appareil photo de qualité, il offre une expérience
					utilisateur fluide, des performances rapides et de superbes photos. Profitez de fonctionnalités telles que la Touch ID,
					la compatibilité avec les accessoires MagSafe et une autonomie de batterie prolongée avec l'iPhone SE.`,
			},
			{
				id: 8,
				name: "Samsung Galaxy Note 20 Ultra",
				price: 1099.99,
				image: phone_9,
				category: "phones",
				description: `Le Samsung Galaxy Note 20 Ultra est un téléphone phare qui allie puissance, productivité et créativité.
					Avec son grand écran Dynamic AMOLED de 6,9 pouces, son stylet S Pen avancé et son système de caméra triple haute résolution,
					il offre des fonctionnalités avancées pour les utilisateurs exigeants. Profitez de performances rapides, d'une
					connectivité 5G et d'une autonomie de batterie longue durée avec le Galaxy Note 20 Ultra.`,
			},
			{
				id: 9,
				name: "Google Pixel 5a",
				price: 599.99,
				image: phone_10,
				category: "phones",
				description: `Le Google Pixel 5a est un téléphone polyvalent qui offre une expérience pure Android et
					des performances fiables. Avec son écran OLED de 6,34 pouces, sa caméra de qualité et sa batterie longue durée,
					il est idéal pour capturer de superbes photos, profiter de jeux et d'applications fluides, et rester connecté
						toute la journée. Découvrez la simplicité et l'efficacité du Pixel 5a.`,
			},
			{
				id: 10,
				name: "OnePlus 9",
				price: 699.99,
				image: phone_11,
				category: "phones",
				description: `Le OnePlus 9 est un téléphone haut de gamme qui offre des performances exceptionnelles et
					une expérience utilisateur fluide. Avec son écran Fluid AMOLED de 6,55 pouces, son processeur Snapdragon 888 et
					son système de caméra Hasselblad, il vous permet de capturer des photos et des vidéos de qualité professionnelle.
					Profitez également de la charge rapide Warp Charge 65T et de la connectivité 5G avec le OnePlus 9.`,
			},
			{
				id: 11,
				name: "Xiaomi Mi 11 Lite",
				price: 499.99,
				image: phone_12,
				category: "phones",
				description: `Le Xiaomi Mi 11 Lite est un téléphone élégant et léger qui offre de bonnes
					performances à un prix abordable. Avec son écran AMOLED de 6,55 pouces, son processeur Snapdragon 732G
					et son système de caméra triple, il vous permet de profiter de jeux, de vidéos et de photos de qualité.
					Découvrez un téléphone qui allie style, fonctionnalités avancées et autonomie de batterie prolongée.`,
			},
			{
				id: 12,
				name: "Sony Xperia 5 III",
				price: 999.99,
				image: phone_13,
				category: "phones",
				description: `Le Sony Xperia 5 III est un téléphone haut de gamme qui offre des performances
					puissantes et un écran cinématographique. Avec son écran OLED de 6,1 pouces au format 21:9,
					son processeur Snapdragon 888 et son système de caméra ZEISS à triple objectif, il vous permet de
					capturer des photos et des vidéos exceptionnelles. Profitez également de fonctionnalités avancées
					telles que la prise en charge du jeu en continu, l'enregistrement vidéo 4K HDR et la connectivité 5G avec le Xperia 5 III.`,
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
