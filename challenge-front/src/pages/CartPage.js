import { ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cartPageBackground from "../assets/images/cart/cart.png";
// import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
	toast[type](message, {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

function CartPage() {
	const [products, setProducts] = useState([]);
	const [deliveryMode, setDeliveryMode] = useState("free");
	const [subtotal, setSubtotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();

	/**
	 * Compute the total price of the cart
	 */
	const computeCardTotalPrice = useCallback(() => {
		setSubtotal(0);
		setTotal(0);
		products.forEach((p) => {
			setSubtotal((prevSubtotal) => prevSubtotal + p.price * p.quantity);
			setTotal(
				(prevTotal) =>
					prevTotal +
					p.price * p.quantity +
					(deliveryMode === "free"
						? 0
						: deliveryMode === "express"
						? 4.99
						: 1.99)
			);
		});
	}, [products, deliveryMode]);

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			setProducts(cart);
		}
	}, []);

	useEffect(() => {
		if (products.length > 0) {
			computeCardTotalPrice();
		}
	}, [products, computeCardTotalPrice]);

	useEffect(() => {
		if (products.length > 0) {
			computeCardTotalPrice();
		}
	}, [deliveryMode, computeCardTotalPrice, products.length]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLogged(true);
		}
	}, []);

	/**
	 * Handle checkout button click for payment
	 * @param { Event } event Event button click
	 */
	const handlePayment = async (event) => {
		event.preventDefault();

		if (isLogged) {
			// const stripe = await loadStripe(
			// 	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
			// );
			// try {
			// 	const response = await fetch("/api/create-checkout-session", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({
			// 			amount: 1000,
			// 			currency: "eur",
			// 		}),
			// 	});
			// 	const { sessionId } = await response.json();
			// 	const { error } = await stripe.redirectToCheckout({ sessionId: sessionId });
			// 	if (error) {
			// 		setToast("Erreur lors du paiement", "error");
			// 	}
			// } catch {
			// 	setToast("Erreur lors du paiement", "error");
			// }
		} else {
			navigate("/login");
		}
	};

	/**
	 * Trigger on each quantity change
	 * - Update the quantity in the state of the product
	 * - Update the localStorage
	 */
	const onQuantityChange = (event, product) => {
		const newQuantity = event.target.value;
		if (newQuantity > 0 && newQuantity <= 100000000) {
			const newProducts = products.map((p) => {
				if (p.id === product.id) {
					p.quantity = newQuantity;
				}
				return p;
			});
			setProducts(newProducts);
		}
	};

	/**
	 * Increase the quantity by 1
	 * @param { Object } product Product to increase
	 */
	const increaseQuantity = (product) => {
		const newProducts = products.map((p) => {
			if (p.id === product.id && p.category === product.category) {
				if (p.quantity < 100000000) {
					p.quantity = p.quantity + 1;
				} else {
					p.quantity = 100000000;
				}
			}
			return p;
		});
		setProducts(newProducts);
	};

	/**
	 * Decrease the quantity by 1
	 * @param { Object } product Product to decrease
	 */
	const decreaseQuantity = (product) => {
		const newProducts = products.map((p) => {
			if (p.id === product.id && p.category === product.category) {
				if (p.quantity > 1) {
					p.quantity = p.quantity - 1;
				} else {
					p.quantity = 1;
				}
			}
			return p;
		});
		setProducts(newProducts);
	};

	/**
	 * Clear the cart and the localStorage
	 * @param { Event } event Click event
	 */
	const clearCart = (event) => {
		event.preventDefault();
		localStorage.removeItem("cart");
		setProducts([]);
		setSubtotal(0);
		setTotal(0);
		setDeliveryMode("free");
		setToast("Le panier a été vidé", "success");
	};

	/**
	 * Update the localStorage with the new cart
	 * @param { Event } event Click event
	 */
	const updateCart = (event) => {
		event.preventDefault();
		localStorage.setItem("cart", JSON.stringify(products));
		setToast("Le panier a été mis à jour", "success");
	};

	/**
	 * Trigger on delivery mode change
	 * @param { String } mode Delivery mode
	 */
	const onDeliveryModeChange = (mode) => setDeliveryMode(mode);

	/**
	 * Redirect to product details page
	 * @param { Event } event Click event
	 * @param { string } id Product id
	 */
	const redirectToProductDetails = (event, product) => {
		event.preventDefault();
		navigate(`/products/${product.category}/${product.id}`, {
			state: { product },
		});
	};

	return (
		<>
			<ToastContainer />
			<div className="home">
				<div className="home_container">
					<div
						className="home_background"
						style={{ backgroundImage: `url(${cartPageBackground})` }}
					></div>
					<div className="home_content_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_content">
										<div className="home_content">
											<div className="breadcrumbs">
												<ul>
													<li>
														<Link to="/" className="text-white">
															Accueil
														</Link>
													</li>
													<li>
														<Link
															to="/categories/headphones"
															className="text-white"
														>
															Catégories
														</Link>
													</li>
													<li className="active font-weight-bold">Panier</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="cart_info"
				style={
					products.length === 0
						? { paddingTop: "50px", paddingBottom: "50px" }
						: {}
				}
			>
				<div className="container">
					{products.length > 0 && (
						<>
							<div className="row">
								<div className="col">
									<div className="cart_info_columns clearfix">
										<div className="cart_info_col cart_info_col_product">
											Produit(s)
										</div>
										<div className="cart_info_col cart_info_col_price">
											Prix
										</div>
										<div className="cart_info_col cart_info_col_quantity">
											Quantité
										</div>
										<div className="cart_info_col cart_info_col_total">
											Totale
										</div>
									</div>
								</div>
							</div>
							<div className="row cart_items_row">
								<div className="col">
									{products.map((product) => (
										<div className="col" key={product.name + "_" + product.id}>
											<div className="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
												<div className="cart_item_product d-flex flex-row align-items-center justify-content-start">
													<div className="cart_item_image">
														<img src={product.image} alt={product.name} />
													</div>
													<div className="cart_item_name_container">
														<div className="cart_item_name">
															<Link
																onClick={(event) =>
																	redirectToProductDetails(event, product)
																}
															>
																{product.name}
															</Link>
														</div>
													</div>
												</div>
												<div className="cart_item_price">
													{product.price.toFixed(2)}€
												</div>
												<div className="cart_item_quantity">
													<div className="product_quantity_container">
														<div className="product_quantity clearfix">
															<input
																id={`quantity_input_${product.id}`}
																type="text"
																value={product.quantity}
																onInput={(event) =>
																	onQuantityChange(event, product)
																}
															/>
															<div className="quantity_buttons">
																<div
																	id={`quantity_inc_button_${product.id}`}
																	className="quantity_inc quantity_control"
																	onClick={() => increaseQuantity(product)}
																>
																	<i
																		className="fa fa-chevron-up"
																		aria-hidden="true"
																	></i>
																</div>
																<div
																	id={`quantity_dec_button_${product.id}`}
																	className="quantity_dec quantity_control"
																	onClick={() => decreaseQuantity(product)}
																>
																	<i
																		className="fa fa-chevron-down"
																		aria-hidden="true"
																	></i>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="cart_item_total">
													{(product.price * product.quantity).toFixed(2)}€
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="row row_cart_buttons">
								<div className="col">
									<div className="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start">
										<div className="cart_buttons_right">
											<div
												className="button clear_cart_button"
												onClick={clearCart}
											>
												<Link>Vider</Link>
											</div>
											<div
												className="button update_cart_button"
												onClick={updateCart}
											>
												<Link>Mettre à jour</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row row_extra">
								<div className="col-lg-4">
									<div className="delivery">
										<div className="section_title">Mode de livraison</div>
										<div className="section_subtitle">
											Livraison et frais supplémentaires
										</div>
										<div className="delivery_options">
											<label className="delivery_option clearfix">
												Rapide (1 jour ouvré)
												<input
													type="radio"
													name="radio"
													checked={deliveryMode === "express"}
													onChange={() => onDeliveryModeChange("express")}
												/>
												<span className="checkmark"></span>
												<span className="delivery_price">4.99€</span>
											</label>
											<label className="delivery_option clearfix">
												Standard (2 jours ouvrés)
												<input
													type="radio"
													name="radio"
													checked={deliveryMode === "standard"}
													onChange={() => onDeliveryModeChange("standard")}
												/>
												<span className="checkmark"></span>
												<span className="delivery_price">1.99€</span>
											</label>
											<label className="delivery_option clearfix">
												Gratuit (5 jours ouvrés)
												<input
													type="radio"
													name="radio"
													checked={deliveryMode === "free"}
													onChange={() => onDeliveryModeChange("free")}
												/>
												<span className="checkmark"></span>
												<span className="delivery_price">Gratuit</span>
											</label>
										</div>
									</div>
								</div>
								<div className="col-lg-6 offset-lg-2">
									<div className="cart_total">
										<div className="section_title">Panier totale</div>
										<div className="section_subtitle">
											Résumé de la commande
										</div>
										<div className="cart_total_container">
											<ul>
												<li className="d-flex flex-row align-items-center justify-content-start">
													<div className="cart_total_title">Sous-total</div>
													<div className="cart_total_value ml-auto">
														{subtotal}€
													</div>
												</li>
												<li className="d-flex flex-row align-items-center justify-content-start">
													<div className="cart_total_title">Livraison</div>
													<div className="cart_total_value ml-auto">
														{deliveryMode === "express"
															? "Rapide"
															: deliveryMode === "standard"
															? "Standard"
															: "Gratuit"}
													</div>
												</li>
												<li className="d-flex flex-row align-items-center justify-content-start">
													<div className="cart_total_title">Total</div>
													<div className="cart_total_value ml-auto">
														{total}€
													</div>
												</li>
											</ul>
										</div>
										<div className="button checkout_button">
											<Link onClick={handlePayment}>Paiement</Link>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
					{products.length === 0 && (
						<div className="row">
							<div className="col">
								<div
									className="cart_container"
									style={{
										textAlign: "center",
										color: "black",
										fontSize: "18px",
									}}
								>
									<div className="cart_title">Votre panier est vide.</div>
									<div className="cart_text mb-2" style={{ marginTop: "50px" }}>
										Faites un tour dans nos catégories et ajoutez des articles à
										votre panier.
									</div>
									<div
										className="d-flex justify-content-center align-items-center"
										style={{ marginTop: "50px" }}
									>
										<div className="button" style={{ margin: "5px" }}>
											<Link to="/categories/headphones">Nos casques</Link>
										</div>
										<div className="button" style={{ margin: "5px" }}>
											<Link to="/categories/tablets">Nos tablettes</Link>
										</div>
									</div>
									<div className="d-flex justify-content-center align-items-center">
										<div className="button" style={{ margin: "5px" }}>
											<Link to="/categories/phones">Nos téléphones</Link>
										</div>
										<div className="button" style={{ margin: "5px" }}>
											<Link to="/categories/cameras">Nos caméras</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default CartPage;
