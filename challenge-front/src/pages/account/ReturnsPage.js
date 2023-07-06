import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import defaultProduct from "../../assets/images/categories/default.png";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

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

function ReturnsPage({ role }) {
	const { name } = useParams();
	const [returns, setReturns] = useState([]);

	useEffect(() => {
		document
			.querySelector(`#account-menu`)
			.querySelectorAll("li")
			.forEach((li) => {
				if (li.id === `account-${name}`) {
					li.classList.add("active");
				} else {
					li.classList.remove("active");
				}
			});
	}, [name]);

	useEffect(() => {
		if (role === "user") {
			initUserReturns();
		} else if (role === "seller") {
			initSellerReturns();
		}
	}, [role]);

	/**
	 * Initialize user returns data
	 */
	const initUserReturns = () => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/returns/users/${decodedToken.id}`, {
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
					const returns = data.map((ret) => {
						const products = ret.orderProducts
							.map((orderProduct) => {
								if (orderProduct?.["product"]) {
									return {
										name: orderProduct.product.label,
										quantity: orderProduct.quantity,
										price: orderProduct.product.price,
										image: orderProduct.product.image
											? orderProduct.product.image
											: defaultProduct,
									};
								} else {
									return null;
								}
							})
							.filter(Boolean);
						return {
							id: ret.id,
							date: ret.date ? ret.date : new Date().toLocaleDateString(),
							products: products,
							reason: ret.reason,
						};
					});
					setReturns(returns);
				} else {
					setToast(
						"Une erreur est survenur lors de la récupération des retours",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenur lors de la récupération des retours",
					"error"
				);
			});
	};

	/**
	 * Initialize seller returns data
	 */
	const initSellerReturns = () => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/returns/sellers/${decodedToken.id}`, {
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
					const returns = data.map((ret) => {
						const products = ret.orderProducts.map((orderProduct) => {
							return {
								name: orderProduct.product.label,
								quantity: orderProduct.product.quantity,
								price: orderProduct.product.price,
								image: orderProduct.product.image
									? orderProduct.product.image
									: defaultProduct,
							};
						});
						return {
							id: ret.id,
							date: ret.date ? ret.date : new Date().toLocaleDateString(),
							products: products,
							reason: ret.reason,
						};
					});
					setReturns(returns);
				} else {
					setToast(
						"Une erreur est survenur lors de la récupération des retours",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenur lors de la récupération des retours",
					"error"
				);
			});
	};

	return (
		<div className="container p-0">
			{returns.length === 0 ? (
				role === "user" ? (
					<div className="text-center mt-5">
						<h3>Aucun retour de commande.</h3>
						<p>
							Effectuez un retour de commande depuis la page{" "}
							<Link style={{ fontStyle: "italic" }} to="/account/orders">
								Mes commandes.
							</Link>
						</p>
					</div>
				) : (
					<div className="text-center mt-5">
						<h3>Aucun retour de commande à afficher.</h3>
						<p>Vous n'avez pas encore de retour de commande pour le moment.</p>
					</div>
				)
			) : (
				returns.map((ret) => (
					<div key={ret.id} className="card mb-3">
						<div className="card-header">
							<h4>Numéro de retour : {ret.id}</h4>
							<p>Date : {ret.date}</p>
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
									{ret.products.map((product, index) => (
										<tr key={`${product.name}${index}`}>
											<td>
												<img
													src={product.image}
													alt={`${product.name}`}
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
							<h5>Raison du retour :</h5>
							<p>{ret.reason}</p>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default ReturnsPage;
