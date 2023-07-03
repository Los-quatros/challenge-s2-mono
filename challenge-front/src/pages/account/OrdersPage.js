import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import HeaderPage from "./HeaderPage";
import defaultProduct from "../../assets/images/categories/default.png";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

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
		closeOnClick: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

/**
 * Reset and set active link in li element
 * @param { string } name Account menu name
 */
const resetAndSetActiveLink = (name) => {
	document
		.querySelector(".list-unstyled")
		.querySelectorAll("li")
		.forEach((li) => li.classList.remove("active"));
	document.querySelector(`#account-${name}`).classList.add("active");
};

function OrdersPage() {
	const { name } = useParams();
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [returnReason, setReturnReason] = useState("");
	const [orders, setOrders] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	useEffect(() => {
		initOrders();
	}, []);

	/**
	 * Submit return request on selected order
	 */
	const submitReturnRequest = () => {
		if (selectedProducts.length === 0) {
			setToast("Veuillez sélectionner au moins un produit", "info");
		} else if (returnReason === "") {
			setToast("Veuillez saisir une raison de retour", "info");
		} else {
			const token = localStorage.getItem("token");
			const decodedToken = jwt_decode(token);
			fetch(`http://localhost:4000/returns/users/${decodedToken.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					orderProducts: selectedProducts.map((product) => {
						return {
							id_product: product.id,
							nbItemReturned: product.quantity,
						};
					}),
					reason: returnReason,
					total: selectedProducts.reduce(
						(acc, product) => acc + product.price * product.quantity,
						0
					),
				}),
			})
				.then((res) => {
					if (res.status === 201) {
						return res.json();
					}
				})
				.then((data) => {
					if (data) {
						setToast(
							"Votre demande de retour a bien été prise en compte",
							"success"
						);
						resetFields();
					} else {
						setToast(
							"Une erreur est survenue lors de la demande de retour",
							"error"
						);
					}
				})
				.catch(() =>
					setToast(
						"Une erreur est survenue lors de la demande de retour",
						"error"
					)
				);
		}
	};

	/**
	 * Handle product selection
	 * @param { object } product Selected product
	 */
	const handleProductSelection = (product) => {
		if (selectedProducts.includes(product)) {
			setSelectedProducts(selectedProducts.filter((p) => p !== product));
		} else {
			setSelectedProducts([...selectedProducts, product]);
		}
	};

	/**
	 * Handle select order
	 * @param { object } order Order object
	 */
	const handleSelectOrder = (order) => {
		if (!order.is_delivered) {
			setToast("Demande de retour impossible, commande non livrée", "info");
		} else {
			setSelectedOrder(order);
		}
	};

	/**
	 * Cancel return request
	 */
	const cancelReturnRequest = () => resetFields();

	/**
	 * Reset fields of order return
	 */
	const resetFields = () => {
		setSelectedProducts([]);
		setSelectedOrder(null);
		setReturnReason("");
	};

	/**
	 * Init orders
	 */
	const initOrders = () => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/orders/users/${decodedToken.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then((data) => {
				if (data) {
					const orders = [];
					data.forEach((order) => {
						if (order.is_paid) {
							const products = order.products.map((product) => {
								return {
									id: product["product"].id,
									name: product["product"].label,
									quantity: product["product"].quantity,
									price: product["product"].price,
									image: product["product"].image
										? product["product"].image
										: defaultProduct,
									is_returned: product.is_returned,
								};
							});
							orders.push({
								id: order.orderId,
								date: order.date ? order.date : new Date().toLocaleDateString(),
								products: products,
								address: `${order.address.street} ${order.address.zip} ${order.address.city}`,
								carrier: order.carrier.name,
								is_delivered: order.is_delivered,
							});
						}
					});
					setOrders(orders);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération des commandes",
						"error"
					);
				}
			})
			.catch(() =>
				setToast(
					"Une erreur est survenue lors de la récupération des commandes",
					"error"
				)
			);
	};

	return (
		<>
			<ToastContainer />
			<div id="content" className="p-4 p-md-5">
				<HeaderPage />
				<div className="container">
					{orders.length > 0 ? (
						orders.map((order, index) => (
							<div key={`${order.name}-${index}`} className="card mb-3">
								<div className="card-header">
									<h4>Numéro de commande : {order.id}</h4>
									<p>Date : {order.date}</p>
								</div>
								<div className="card-body">
									<h5>Produits :</h5>
									<table className="table">
										<thead>
											<tr>
												<th>Image</th>
												<th>Nom du produit</th>
												<th>Quantité</th>
												<th>Prix</th>
												{order.is_delivered && <th>Retour</th>}
											</tr>
										</thead>
										<tbody>
											{order.products.map((product, index) => (
												<tr key={`${product.label}-${index}`}>
													<td>
														<img
															src={product.image}
															alt={product.name}
															style={{ width: "50px", height: "50px" }}
														/>
													</td>
													<td>{product.name}</td>
													<td>{product.quantity}</td>
													<td>{product.price}€</td>
													{order.is_delivered && (
														<td>
															<input
																type="checkbox"
																disabled={product.is_returned}
																checked={
																	product.is_returned ||
																	selectedProducts.includes(product)
																}
																onChange={() => handleProductSelection(product)}
															/>
														</td>
													)}
												</tr>
											))}
										</tbody>
									</table>
									<div className="transporter-info">
										<h5>Transporteur :</h5>
										<div className="transporter">
											<div className="transporter-details">
												<h6>{order.carrier}</h6>
											</div>
										</div>
									</div>
									<h5>Adresse de livraison :</h5>
									<p>{order.address}</p>
									<div className="text-left">
										{selectedOrder && selectedOrder.id === order.id ? (
											<>
												<div>
													<button
														className="btn btn-secondary  mr-2"
														onClick={cancelReturnRequest}
													>
														Annuler le retour
													</button>
													<button
														className="btn btn-secondary "
														onClick={submitReturnRequest}
													>
														Valider le retour
													</button>
												</div>
												<div className="mt-3">
													<textarea
														className="form-control"
														rows="3"
														placeholder="Raison du retour ..."
														value={returnReason}
														onChange={(event) =>
															setReturnReason(event.target.value)
														}
													></textarea>
												</div>
											</>
										) : (
											<button
												disabled={!order.is_delivered}
												style={{
													cursor: !order.is_delivered
														? "not-allowed"
														: "pointer",
												}}
												className="btn btn-secondary"
												onClick={() => handleSelectOrder(order)}
											>
												Demander un retour
											</button>
										)}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center mt-5">
							<h3>Aucune commande à afficher</h3>
							<p>Vous n'avez passé aucune commande pour le moment.</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default OrdersPage;
