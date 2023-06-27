import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import Products from "../../pages/ProductsPage";
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

const title = "Nos caméras";
const content = `Découvrez notre sélection de tablettes haut de gamme qui
	vous offriront une expérience technologique exceptionnelle. Que vous soyez un amateur de
	divertissement, un étudiant ou un professionnel en déplacement, nos tablettes sont conçues pour répondre à
	tous vos besoins.`;

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
        category: "tablets",
        description: `L'iPad Pro d'Apple est une tablette puissante qui offre des performances exceptionnelles
					et une expérience utilisateur haut de gamme. Avec son écran Retina de haute qualité, son
					processeur rapide et sa compatibilité avec l'Apple Pencil et le Magic Keyboard, l'iPad Pro est
					l'outil idéal pour les professionnels créatifs, les étudiants et les utilisateurs exigeants.`,
      },
      {
        id: 2,
        name: "Tablette Samsung Galaxy Tab S7",
        price: 799.99,
        image: tablet_3,
        category: "tablets",
        description: `La tablette Samsung Galaxy Tab S7 est une tablette polyvalente qui offre une expérience
					de divertissement et de productivité exceptionnelle. Avec son écran Super AMOLED de haute qualité, son stylet S Pen
					amélioré et son puissant processeur, elle est parfaite pour les jeux, la création de contenu, le multitâche et bien plus encore.`,
      },
      {
        id: 3,
        name: "Tablette Microsoft Surface Pro",
        price: 1299.99,
        image: tablet_4,
        category: "tablets",
        description: `La tablette Microsoft Surface Pro est conçue pour les professionnels et les créatifs qui ont
					besoin d'une tablette performante avec une grande flexibilité. Avec son écran tactile PixelSense, son clavier
					amovible et son stylet Surface Pen, elle offre une expérience de travail productive et créative. Profitez
					d'une performance fluide, d'un design élégant et de fonctionnalités avancées avec la tablette Microsoft Surface Pro.`,
      },
      {
        id: 4,
        name: "Tablette Lenovo Yoga Tab",
        price: 349.99,
        image: tablet_5,
        category: "tablets",
        description: `La tablette Lenovo Yoga Tab est une tablette polyvalente avec un design unique et des fonctionnalités
					innovantes. Avec son écran rotatif, sa batterie longue durée et ses haut-parleurs JBL intégrés, elle offre une
					expérience de divertissement immersive. Que vous regardiez des films, surfiez sur le web ou travailliez,
					la tablette Lenovo Yoga Tab est prête à répondre à tous vos besoins.`,
      },
      {
        id: 5,
        name: "Tablette Huawei MediaPad M6",
        price: 599.99,
        image: tablet_6,
        category: "tablets",
        description: `La tablette Huawei MediaPad M6 est une tablette performante qui offre des fonctionnalités avancées
					et un design élégant. Avec son écran Full HD, son processeur puissant et ses haut-parleurs Harman Kardon,
					elle est idéale pour le divertissement et la productivité. Profitez d'une expérience multimédia immersive
					et d'une connectivité fiable avec la tablette Huawei MediaPad M6.`,
      },
      {
        id: 6,
        name: "Tablette Amazon Fire HD",
        price: 149.99,
        image: tablet_7,
        category: "tablets",
        description: `La tablette Amazon Fire HD est un choix abordable pour ceux qui recherchent une tablette polyvalente
					pour le divertissement et la navigation sur le web. Avec son écran HD, son accès aux services Amazon et sa
					compatibilité avec Alexa, elle offre une expérience conviviale et complète. Profitez de la vaste bibliothèque
					de contenus, des jeux, des livres électroniques et plus encore avec la tablette Amazon Fire HD.`,
      },
      {
        id: 7,
        name: "Tablette Google Pixel Slate",
        price: 899.99,
        image: tablet_8,
        category: "tablets",
        description: `La tablette Google Pixel Slate est une tablette haut de gamme conçue pour les utilisateurs exigeants.
					Avec son écran haute résolution, son système d'exploitation Chrome OS et sa compatibilité avec les applications
					Android, elle offre une expérience multitâche fluide et une productivité exceptionnelle. Profitez d'une performance
					rapide, d'une connectivité sans fil avancée et d'un design élégant avec la tablette Google Pixel Slate.`,
      },
      {
        id: 8,
        name: "Tablette Asus ZenPad",
        price: 299.99,
        image: tablet_9,
        category: "tablets",
        description: `La tablette Asus ZenPad est une tablette abordable qui offre de bonnes performances et une expérience
					utilisateur agréable. Avec son écran IPS, son design léger et son interface conviviale, elle est idéale pour le
					divertissement, la navigation sur le web et les tâches quotidiennes. Profitez d'une connectivité pratique,
					d'une autonomie de batterie prolongée et d'une excellente valeur avec la tablette Asus ZenPad.`,
      },
      {
        id: 9,
        name: "Tablette Sony Xperia Tablet",
        price: 599.99,
        image: tablet_10,
        category: "tablets",
        description: `La tablette Sony Xperia Tablet est une tablette haut de gamme qui offre des performances exceptionnelles
					et une expérience multimédia immersive. Avec son écran Triluminos, sa puissance de traitement élevée et sa
					compatibilité avec les services de divertissement de Sony, elle offre une qualité d'image époustouflante et
					une connectivité avancée. Profitez d'un divertissement sans compromis avec la tablette Sony Xperia Tablet.`,
      },
      {
        id: 10,
        name: "Tablette Dell Latitude",
        price: 1199.99,
        image: tablet_11,
        category: "tablets",
        description: `La tablette Dell Latitude est une tablette professionnelle conçue pour les utilisateurs exigeants en
					matière de performance et de sécurité. Avec son écran tactile, son système d'exploitation Windows, sa compatibilité
					avec les applications professionnelles et ses fonctionnalités de sécurité avancées, elle est parfaite pour le
					travail en déplacement. Profitez d'une productivité optimisée et d'une expérience informatique fiable avec la tablette Dell Latitude.`,
      },
      {
        id: 11,
        name: "Tablette Huawei MatePad Pro",
        price: 699.99,
        image: tablet_12,
        category: "tablets",
        description: `La tablette Huawei MatePad Pro est une tablette haut de gamme qui offre des performances puissantes
					et une expérience visuelle immersive. Avec son écran FullView, sa puissance de traitement avancée et son stylet
					M-Pencil, elle convient parfaitement aux professionnels créatifs et aux utilisateurs exigeants. Profitez d'une
					connectivité fluide, d'une autonomie de batterie prolongée et d'un design élégant avec la tablette Huawei MatePad Pro.`,
      },
      {
        id: 12,
        name: "Tablette Amazon Kindle Paperwhite",
        price: 129.99,
        image: tablet_13,
        category: "tablets",
        description: `La tablette Amazon Kindle Paperwhite est une tablette dédiée à la lecture numérique. Avec son écran
					haute résolution, son éclairage intégré et sa capacité de stockage importante, elle offre une expérience de
					lecture confortable et pratique. Profitez d'un accès facile à une vaste sélection de livres électroniques,
					de magazines et de journaux avec la tablette Amazon Kindle Paperwhite.`,
      },
    ]);
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
