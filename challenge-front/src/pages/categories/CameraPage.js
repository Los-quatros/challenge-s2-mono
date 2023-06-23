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
				category: "camera",
				description: `Le Canon EOS 5D Mark IV est un appareil photo reflex numérique haut de gamme qui offre des
					performances exceptionnelles. Doté d'un capteur plein format de 30,4 mégapixels, il capture des images
					détaillées avec une grande précision des couleurs. Son système de mise au point avancé et
					sa sensibilité ISO élevée permettent de photographier dans des conditions de faible luminosité.
					De plus, il enregistre des vidéos 4K de qualité cinéma et offre une connectivité sans fil pour faciliter le partage des images.`,
			},
			{
				id: 2,
				name: "Nikon D850",
				price: 2999.99,
				image: camera_3,
				category: "camera",
				description: `Le Nikon D850 est un appareil photo reflex numérique professionnel conçu pour les photographes
					exigeants. Avec son capteur plein format de 45,7 mégapixels, il capture des images d'une netteté et d'une
					richesse de détails exceptionnelles. Sa plage dynamique étendue et sa sensibilité ISO élevée garantissent
					des performances exceptionnelles même dans des conditions de faible luminosité. De plus, il offre des
					fonctionnalités avancées telles que la vidéo 4K, la mise au point automatique rapide et précise, ainsi
					qu'une construction robuste pour une durabilité à toute épreuve.`,
			},
			{
				id: 3,
				name: "Sony Alpha A7 III",
				price: 1999.99,
				image: camera_4,
				category: "camera",
				description: `Le Sony Alpha A7 III est un appareil photo sans miroir plein format polyvalent offrant une
					qualité d'image exceptionnelle et des performances avancées. Son capteur rétroéclairé de 24,2 mégapixels
					capture des images détaillées avec une plage dynamique étendue et une excellente sensibilité en basse lumière.
					Grâce à son système de mise au point automatique rapide et précis, vous ne manquerez jamais un moment important.
					De plus, il enregistre des vidéos 4K de haute qualité et offre une stabilisation d'image intégrée pour des résultats nets et stables.`,
			},
			{
				id: 4,
				name: "Fujifilm X-T4",
				price: 1699.99,
				image: camera_5,
				category: "camera",
				description: `Le Fujifilm X-T4 est un appareil photo hybride haut de gamme qui allie performance et style.
					Avec son capteur X-Trans CMOS 4 de 26,1 mégapixels et son processeur d'image X-Processor 4, il offre des
					images de qualité exceptionnelle avec une reproduction des couleurs précise. Son système de mise au point
					automatique rapide et précis vous permet de capturer des sujets en mouvement avec facilité. De plus,
					il offre des fonctionnalités vidéo avancées telles que l'enregistrement 4K à haute résolution et
					la stabilisation d'image intégrée pour des vidéos fluides.`,
			},
			{
				id: 5,
				name: "Panasonic Lumix GH5",
				price: 1799.99,
				image: camera_6,
				category: "camera",
				description: `Le Panasonic Lumix GH5 est un appareil photo hybride professionnel conçu pour les vidéastes et les photographes
					exigeants. Doté d'un capteur Digital Live MOS de 20,3 mégapixels sans filtre passe-bas, il offre des images
					détaillées avec une reproduction précise des couleurs. Sa fonction d'enregistrement vidéo 4K à haute résolution
					avec une cadence élevée capture des vidéos fluides et nettes. De plus, il dispose d'un système de stabilisation
					d'image Dual I.S. 2 intégré pour des photos et des vidéos sans flou de bougé.`,
			},
			{
				id: 6,
				name: "Olympus OM-D E-M1 Mark III",
				price: 1799.99,
				image: camera_7,
				category: "camera",
				description: `L'Olympus OM-D E-M1 Mark III est un appareil photo sans miroir professionnel offrant des performances
					exceptionnelles dans un boîtier compact. Avec son capteur Live MOS de 20,4 mégapixels et son processeur d'image TruePic IX,
					il capture des images nettes avec une plage dynamique étendue. Son système de mise au point automatique à détection de phase
					avec 121 points de mise au point assure une mise au point rapide et précise. De plus, il est doté d'une stabilisation d'image
					sur 5 axes pour des photos et des vidéos nettes même en basse lumière.`,
			},
			{
				id: 7,
				name: "Canon EOS R6",
				price: 2499.99,
				image: camera_8,
				category: "camera",
				description: `Le Canon EOS R6 est un appareil photo hybride plein format qui offre des performances exceptionnelles dans un
					boîtier compact. Avec son capteur CMOS de 20,1 mégapixels et son processeur d'image DIGIC X, il capture des images détaillées
					avec une plage dynamique étendue et une faible sensibilité au bruit. Son système de mise au point automatique à double pixel
					permet une mise au point rapide et précise, même en conditions de faible luminosité. De plus, il enregistre des vidéos 4K
					de haute qualité et offre une stabilisation d'image intégrée pour des résultats nets et stables.`,
			},
			{
				id: 8,
				name: "Nikon Z6 II",
				price: 2299.99,
				image: camera_9,
				category: "camera",
				description: `Le Nikon Z6 II est un appareil photo hybride plein format conçu pour les photographes professionnels.
					Doté d'un capteur CMOS rétroéclairé de 24,5 mégapixels et du puissant processeur d'image EXPEED 6,
					il offre des performances exceptionnelles avec une reproduction des couleurs précise et une sensibilité élevée
					en basse lumière. Son système de mise au point automatique à détection de phase avancé assure une mise au point
					rapide et précise. De plus, il enregistre des vidéos 4K UHD avec une net`,
			},
			{
				id: 9,
				name: "Sony Cyber-shot RX100 VII",
				price: 1299.99,
				image: camera_10,
				category: "camera",
				description: `Le Sony Cyber-shot RX100 VII est un appareil photo compact haut de gamme offrant des performances
					exceptionnelles dans un format de poche. Avec son capteur CMOS Exmor RS de 20,1 mégapixels et son processeur
					d'image BIONZ X, il capture des images détaillées avec une grande précision des couleurs. Son objectif zoom
					haute qualité offre une polyvalence pour diverses situations de prise de vue. De plus, il est doté d'un système de mise au point automatique rapide et précis, d'un viseur électronique intégré et d'enregistrement vidéo 4K pour une expérience complète.`,
			},
			{
				id: 10,
				name: "Fujifilm X100V",
				price: 1399.99,
				image: camera_11,
				category: "camera",
				description: `Le Fujifilm X100V est un appareil photo compact haut de gamme offrant des performances exceptionnelles
					dans un boîtier rétro et élégant. Doté d'un capteur X-Trans CMOS 4 de 26,1 mégapixels et d'un objectif fixe de haute
					qualité, il capture des images nettes avec une reproduction précise des couleurs. Son viseur hybride avancé, son système
					de mise au point automatique rapide et précis, ainsi que ses commandes manuelles intuitives en font l'appareil idéal pour
					les photographes passionnés. De plus, il enregistre des vidéos 4K de haute qualité pour une créativité sans limites.`,
			},
			{
				id: 11,
				name: "Panasonic Lumix S5",
				price: 1999.99,
				image: camera_12,
				category: "camera",
				description: `Le Panasonic Lumix S5 est un appareil photo hybride plein format polyvalent qui allie performances élevées
					et compacité. Avec son capteur CMOS de 24,2 mégapixels et son processeur d'image Venus Engine, il capture des images
					détaillées avec une reproduction des couleurs précise. Son système de mise au point automatique à détection de contraste
					rapide et précis vous permet de saisir des moments décisifs avec facilité. De plus, il offre des fonctionnalités vidéo avancées,
					y compris l'enregistrement 4K à haute résolution et la stabilisation d'image pour des vidéos fluides et nettes.`,
			},
			{
				id: 12,
				name: "Olympus PEN-F",
				price: 1199.99,
				image: camera_13,
				category: "camera",
				description: `L'Olympus PEN-F est un appareil photo hybride haut de gamme qui allie style rétro et performances modernes.
					Avec son capteur Live MOS de 20,3 mégapixels et son processeur d'image TruePic VII, il offre des images de haute qualité
					avec une large plage dynamique. Son système de mise au point automatique à détection de contraste rapide et précis vous
					permet de capturer des images nettes avec facilité. De plus, il dispose d'une gamme de fonctionnalités créatives, y compris
					l'enregistrement vidéo 4K et la prise de vue en rafale à haute vitesse.`,
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
