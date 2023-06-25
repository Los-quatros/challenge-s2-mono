import { Link, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import HomeContainer from "../HomeContainerPage";
import imageCamerasBackground from "../../assets/images/categories/cameras/camera_1.png";
import imageHeadphonesBackground from "../../assets/images/categories/headphones/headphone_1.png";
import imagePhonesBackground from "../../assets/images/categories/phones/phone_1.png";
import imageTabletsBackground from "../../assets/images/categories/tablets/tablet_1.png";

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
	toast[type](message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

/**
 * Handle link click to prevent page reload
 * @param { Event } event Click event
 */
const handleLinkClick = (event) => event.preventDefault();

function ProductDetailsPage() {
	const location = useLocation();
	const { product } = location.state;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	const [quantity, setQuantity] = useState(1);
	const categories = ["headphones", "tablets", "phones", "cameras"];

	useEffect(() => {
		if (product.category === "headphones") {
			setTitle("Nos casques");
		} else if (product.category === "tablets") {
			setTitle("Nos tablettes");
		} else if (product.category === "phones") {
			setTitle("Nos téléphones");
		} else {
			setTitle("Nos caméras");
		}
	}, [product.category]);

	useEffect(() => {
		if (product.category === "headphones") {
			setContent(`Plongez au cœur d'une expérience sonore immersive et
      exceptionnelle avec nos casques de musique haut de gamme. Que vous soyez un audiophile
      passionné ou que vous cherchiez simplement à profiter pleinement de votre
      musique préférée, nos casques vous offriront une qualité audio inégalée.`);
		} else if (product.category === "tablets") {
			setContent(`Découvrez notre sélection de tablettes haut de gamme qui
      vous offriront une expérience technologique exceptionnelle. Que vous soyez un amateur de
      divertissement, un étudiant ou un professionnel en déplacement, nos tablettes sont conçues pour répondre à
      tous vos besoins.`);
		} else if (product.category === "phones") {
			setContent(`Découvrez notre téléphone révolutionnaire, alliant style
      et fonctionnalités avancées ! Son design élégant et ergonomique captivera votre regard dès le premier
      instant. Plongez dans une expérience immersive grâce à son écran haute résolution, offrant des couleurs vives
      et un contraste saisissant. Vous ne pourrez plus détacher vos yeux de ce spectacle visuel captivant.`);
		} else {
			setContent(`Découvrez la puissance de la capture avec nos caméras de pointe.
      Offrant une qualité  d'image exceptionnelle et des fonctionnalités avancées,
      elles sont conçues pour répondre aux besoins des photographes et des vidéastes les plus exigeants.
      Faites un pas vers l'excellence photographique avec nos caméras de haute précision.`);
		}
	}, [product.category]);

	useEffect(() => {
		if (product.category === "headphones") {
			setImage(imageHeadphonesBackground);
		} else if (product.category === "tablets") {
			setImage(imageTabletsBackground);
		} else if (product.category === "phones") {
			setImage(imagePhonesBackground);
		} else {
			setImage(imageCamerasBackground);
		}
	}, [product.category]);

	/**
	 * Triggered when the quantity input value changes
	 * @param { Event } event Input event
	 */
	const onQuantityChange = (event) => {
		const value = event.target.value;
		if (value < 1) {
			setQuantity(1);
		} else if (value > 100000000) {
			setQuantity(100000000);
		} else {
			setQuantity(Number(value));
		}
	};

	/**
	 * Increase the quantity by 1
	 */
	const increaseQuantity = () => {
		if (quantity < 100000000) {
			setQuantity(quantity + 1);
		} else {
			setQuantity(100000000);
		}
	};

	/**
	 * Decrease the quantity by 1
	 */
	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		} else {
			setQuantity(1);
		}
	};

	/**
	 * Add the product to the cart
	 * @param { Event } event Click event
	 * @param { Object } product Product to add to the cart
	 */
	const addProductToCart = (event, product) => {
		event.preventDefault();
		const cart = JSON.parse(localStorage.getItem("cart"));
		const productToCart = {
			id: "",
			name: "",
			category: "",
			price: "",
			quantity: "",
		};
		if (cart) {
			const existingProduct = cart.find(
				(item) => item.id === product.id && item.category === product.category
			);
			if (existingProduct) {
				existingProduct.quantity += quantity;
			} else {
				productToCart.id = product.id;
				productToCart.name = product.name;
				productToCart.category = product.category;
				productToCart.price = product.price;
				productToCart.quantity = quantity;
				cart.push(productToCart);
			}
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			productToCart.id = product.id;
			productToCart.name = product.name;
			productToCart.category = product.category;
			productToCart.price = product.price;
			productToCart.quantity = quantity;
			localStorage.setItem("cart", JSON.stringify([productToCart]));
		}
		setToast("Produit ajouté au panier", "success");
		setQuantity(1);
	};

	if (!categories.includes(product.category)) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<ToastContainer />
			<div className="home">
				<HomeContainer image={image} title={title} content={content} />
			</div>
			<div className="product_details">
				<div className="container">
					<div className="row details_row">
						<div className="col-lg-6">
							<div className="details_image">
								<div className="details_image_large">
									<img src={product.image} alt={product.name} />
								</div>
								<div className="details_image_thumbnails d-flex flex-row align-items-start justify-content-between">
									<div className="details_image_thumbnail active">
										<img src={product.image} alt={product.name} />
									</div>
									<div className="details_image_thumbnail">
										<img src={product.image} alt={product.name} />
									</div>
									<div className="details_image_thumbnail">
										<img src={product.image} alt={product.name} />
									</div>
									<div className="details_image_thumbnail">
										<img src={product.image} alt={product.name} />
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="details_content">
								<div className="details_name">{product.name}</div>
								<div className="details_price">{product.price} €</div>
								<div className="details_text">
									<p>{product.description}</p>
								</div>
								<div className="product_quantity_container">
									<div className="product_quantity clearfix">
										<input
											id="quantity_input"
											type="text"
											onInput={(event) => onQuantityChange(event)}
											value={quantity}
										/>
										<div className="quantity_buttons">
											<div
												id="quantity_inc_button"
												className="quantity_inc quantity_control"
												onClick={increaseQuantity}
											>
												<i className="fa fa-chevron-up" aria-hidden="true"></i>
											</div>
											<div
												id="quantity_dec_button"
												className="quantity_dec quantity_control"
												onClick={decreaseQuantity}
											>
												<i
													className="fa fa-chevron-down"
													aria-hidden="true"
												></i>
											</div>
										</div>
									</div>
									<div className="button cart_button">
										<Link onClick={(event) => addProductToCart(event, product)}>
											Ajouter
										</Link>
									</div>
								</div>
								<div className="details_share">
									<ul>
										<li>
											<Link onClick={handleLinkClick}>
												<i className="fa fa-pinterest" aria-hidden="true"></i>
											</Link>
										</li>
										<li>
											<Link onClick={handleLinkClick}>
												<i className="fa fa-instagram" aria-hidden="true"></i>
											</Link>
										</li>
										<li>
											<Link onClick={handleLinkClick}>
												<i className="fa fa-facebook" aria-hidden="true"></i>
											</Link>
										</li>
										<li>
											<Link onClick={handleLinkClick}>
												<i className="fa fa-twitter" aria-hidden="true"></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetailsPage;
