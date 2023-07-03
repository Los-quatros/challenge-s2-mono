import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import HeaderPage from "./HeaderPage";
import headphone1 from "../../assets/images/categories/headphones/headphone_6.png"; // TODO remove
import headphone2 from "../../assets/images/categories/headphones/headphone_8.png"; // TODO remove
import phone1 from "../../assets/images/categories/phones/phone_6.png"; // TODO remove
import phone2 from "../../assets/images/categories/phones/phone_4.png"; // TODO remove
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

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	useEffect(() => {
		initOrders();
	}, []);

	/**
	 * Submit return request on selected order
	 * TODO : fetch API
	 * TODO : toasts
	 */
	const submitReturnRequest = () => {
		if (returnReason === "") {
			setToast("Veuillez saisir une raison de retour", "info");
		} else {
			setToast("Votre demande de retour a bien été prise en compte", "success");
			setSelectedOrder(null);
			setReturnReason("");
		}
	};

	/**
	 * Handle select order
	 * @param { object } order Order object
	 */
	const handleSelectOrder = (order) => {
		if (!order.isDelivered) {
			setToast("Demande de retour impossible, commande non livrée", "info");
		} else {
			setSelectedOrder(order);
		}
	};

	/**
	 * Cancel return request
	 */
	const cancelReturnRequest = () => {
		setSelectedOrder(null);
		setReturnReason("");
	};

	/**
	 * Init orders
	 * TODO : fetch orders from API
	 * TODO : toasts
	 * TODO : verify if we receive only isPaid = true
	 */
	const initOrders = () => {
		setOrders([
			{
				id: "0f789703-c647-4e9f-8507-e5d23df473ce",
				date: "01-07-2021",
				products: [
					{
						name: "Apple iPhone 12 Pro Max",
						quantity: 1,
						price: 1259.99,
						image: phone1,
					},
					{
						name: "Casque audio Sony WH-1000XM4",
						quantity: 1,
						price: 379.99,
						image: headphone1,
					},
				],
				address: "1 rue de la paix",
				carrier: "UPS",
				isDelivered: true,
			},
			{
				id: "0f789703-c646-4e9f-8507-e5d23df473ce",
				date: "01-07-2021",
				products: [
					{
						name: "Apple iPhone 12 Pro Max",
						quantity: 1,
						price: 1259.99,
						image: phone2,
					},
					{
						name: "Casque audio Sony WH-1000XM4",
						quantity: 1,
						price: 379.99,
						image: headphone2,
					},
				],
				address: "1 rue de la paix",
				carrier: "Colissimo",
				isDelivered: false,
			},
		]);
	};

	return (
		<>
			<ToastContainer />
			<div id="content" className="p-4 p-md-5">
				<HeaderPage />
				<div className="container">
					{orders.length > 0 ? (
						orders.map((order) => (
							<div key={order.id} className="card mb-3">
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
											</tr>
										</thead>
										<tbody>
											{order.products.map((product) => (
												<tr key={product.name}>
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
												disabled={!order.isDelivered}
												style={{
													cursor: !order.isDelivered
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
