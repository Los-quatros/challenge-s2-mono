import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
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
				category: "headphones",
				description: `Le casque sans fil Sony WH-1000XM4 offre une expérience audio immersive avec une qualité sonore exceptionnelle.
					Doté de la technologie de réduction de bruit active, il vous permet de vous plonger dans votre musique préférée sans être
					dérangé par les bruits extérieurs. Sa batterie longue durée vous offre une écoute sans interruption pendant des heures.
					De plus, il est doté d'un design confortable et élégant, avec des commandes intuitives pour une utilisation facile.`,
			},
			{
				id: 2,
				name: "Casque audio Bose QuietComfort 35 II",
				price: 299.99,
				image: headphone_3,
				category: "headphones",
				description: `Le casque audio Bose QuietComfort 35 II offre un son exceptionnel et une réduction de bruit de premier ordre.
					Profitez de votre musique avec une clarté et une précision incroyables, tout en bloquant les bruits indésirables.
					Avec sa connectivité sans fil Bluetooth, vous pouvez écouter vos morceaux préférés en toute liberté. De plus, il est
					doté d'un design léger et confortable, idéal pour une utilisation prolongée.`,
			},
			{
				id: 3,
				name: "Casque sans fil Apple AirPods Pro",
				price: 249.99,
				image: headphone_4,
				category: "headphones",
				description: `Les casques sans fil Apple AirPods Pro offrent une expérience audio exceptionnelle avec un son immersif et
					une réduction de bruit active. Profitez de vos chansons préférées avec une qualité sonore exceptionnelle et une clarté incroyable.
					Les AirPods Pro sont également résistants à l'eau et à la transpiration, ce qui les rend parfaits pour une
					utilisation pendant les séances d'entraînement ou les activités sportives. De plus, leur boîtier de
					recharge offre une autonomie prolongée pour une écoute sans interruption.`,
			},
			{
				id: 4,
				name: "Casque gaming SteelSeries Arctis 7",
				price: 149.99,
				image: headphone_5,
				category: "headphones",
				description: `Le casque gaming SteelSeries Arctis 7 est spécialement conçu pour offrir une expérience de jeu immersive.
					Avec sa technologie audio de qualité supérieure, il vous plonge au cœur de l'action avec un son clair et détaillé. Son microphone
					rétractable avec suppression du bruit assure une communication vocale cristalline avec vos coéquipiers. De plus, sa conception légère
					et confortable vous permet de jouer pendant des heures sans inconfort.`,
			},
			{
				id: 5,
				name: "Casque audio Sennheiser HD 660 S",
				price: 499.99,
				image: headphone_6,
				category: "headphones",
				description: `Le casque audio Sennheiser HD 660 S offre une qualité sonore exceptionnelle et un confort optimal. Grâce à
					ses transducteurs haute performance et à sa conception ouverte, il vous permet de profiter de votre
					musique préférée avec une clarté et une précision incroyables. De plus, il est doté d'un design léger
					et confortable, idéal pour une utilisation prolongée`,
			},
			{
				id: 6,
				name: "Casque sans fil JBL E55BT",
				price: 79.99,
				image: headphone_7,
				category: "headphones",
				description: `Le casque sans fil JBL E55BT offre un son de qualité supérieure et une expérience d'écoute sans fil
					pratique. Avec sa connectivité Bluetooth, il vous permet de vous déplacer librement tout en profitant de votre
					musique préférée. Les haut-parleurs de 50 mm offrent des basses puissantes et des aigus cristallins. Son design
					léger et pliable en fait un choix idéal pour une utilisation quotidienne et les déplacements.`,
			},
			{
				id: 7,
				name: "Casque audio AKG K240 Studio",
				price: 69.99,
				image: headphone_8,
				category: "headphones",
				description: `Le casque audio AKG K240 Studio est apprécié par les professionnels de l'audio pour sa qualité
					sonore exceptionnelle. Doté de transducteurs semi-ouverts, il offre une reproduction sonore précise et équilibrée.
					Son design circum-aural assure un confort optimal, même pendant de longues sessions d'écoute. Que vous soyez un musicien,
					un ingénieur du son ou un amateur de musique exigeant, le casque AKG K240 Studio saura satisfaire vos attentes.`,
			},
			{
				id: 8,
				name: "Casque gaming Razer Kraken",
				price: 89.99,
				image: headphone_9,
				category: "headphones",
				description: `Le casque gaming Razer Kraken est conçu pour offrir une expérience de jeu immersive. Doté de haut-parleurs
					de 50 mm, il offre un son puissant et précis qui vous plonge au cœur de l'action. Son microphone rétractable vous permet
					de communiquer facilement avec vos coéquipiers, et son confort exceptionnel vous permet de jouer pendant de
					longues heures sans fatigue. Profitez d'un son de qualité et d'un confort optimal avec le casque Razer Kraken.`,
			},
			{
				id: 9,
				name: "Casque sans fil Beats Solo3",
				price: 199.99,
				image: headphone_10,
				category: "headphones",
				description: `Le casque sans fil Beats Solo3 vous offre une expérience d'écoute sans fil exceptionnelle. Doté de la puce
					Apple W1, il assure une connexion Bluetooth rapide et stable avec vos appareils Apple. Profitez d'un son de qualité supérieure
					avec des basses puissantes et une clarté remarquable. Sa batterie longue durée vous permet de profiter de
					votre musique pendant des heures. De plus, son design élégant et confortable en fait un accessoire
					parfait pour votre style de vie actif.`,
			},
			{
				id: 10,
				name: "Casque audio Audio-Technica ATH-M50x",
				price: 149.99,
				image: headphone_11,
				category: "headphones",
				description: `Le casque audio Audio-Technica ATH-M50x est un choix idéal pour les amateurs de musique et les professionnels
					du son. Avec ses transducteurs de 45 mm, il offre un son puissant et précis avec une réponse en fréquence étendue.
					Sa conception circum-auriculaire fermée assure une isolation sonore optimale et un confort accru. De plus, il est doté
					d'un câble détachable et d'une conception pliable, ce qui le rend pratique à transporter.`,
			},
			{
				id: 11,
				name: "Casque gaming Logitech G Pro X",
				price: 129.99,
				image: headphone_12,
				category: "headphones",
				description: `Le casque gaming Logitech G Pro X est conçu pour les joueurs exigeants. Avec sa technologie audio avancée,
					il offre un son surround immersif et une clarté exceptionnelle. Son microphone Blue VO!CE avec suppression du bruit
					assure une communication vocale claire et nette pendant le jeu. De plus, son design léger et confortable permet de
					jouer pendant de longues heures sans fatigue. Profitez d'une expérience de jeu ultime avec le casque Logitech G Pro X.`,
			},
			{
				id: 12,
				name: "Casque sans fil Jabra Elite 85h",
				price: 299.99,
				image: headphone_13,
				category: "headphones",
				description: `Le casque sans fil Jabra Elite 85h vous offre une expérience d'écoute supérieure avec un son exceptionnel
					et une réduction de bruit active intelligente. Profitez d'une qualité audio exceptionnelle avec des basses puissantes
					et des aigus clairs. Sa batterie longue durée vous permet de profiter de votre musique pendant des heures sans interruption.
					De plus, il est doté de fonctionnalités pratiques telles que la commande vocale, les commandes tactiles intuitives et
					la résistance à l'eau pour une utilisation quotidienne sans souci.`,
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
