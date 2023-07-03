import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import HeaderPage from "./HeaderPage";
import headphone1 from "../../assets/images/categories/headphones/headphone_6.png"; // TODO remove
import headphone2 from "../../assets/images/categories/headphones/headphone_8.png"; // TODO remove
import phone1 from "../../assets/images/categories/phones/phone_6.png"; // TODO remove
import phone2 from "../../assets/images/categories/phones/phone_4.png"; // TODO remove

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

function ReturnsPage() {
	const { name } = useParams();
	const [returns, setReturns] = useState([]);

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	useEffect(() => {
		initReturns();
	}, []);

	/**
	 * Initialize returns data
	 * TODO : fetch data from API
	 * TODO : toast error
	 */
	const initReturns = () => {
		setReturns([
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
				reason: "Article endommagé",
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
				reason: "Taille non conforme",
			},
		]);
	};

	return (
		<>
			<ToastContainer />
			<div id="content" className="p-4 p-md-5">
				<HeaderPage />
				<div className="container p-0">
					{returns.length === 0 ? (
						<div className="text-center mt-5">
							<h3>Aucun retour de commande</h3>
							<p>
								Effectuez un retour de commande depuis la page{" "}
								<Link style={{ fontStyle: "italic" }} to="/account/orders">
									Mes commandes
								</Link>
							</p>
						</div>
					) : (
						returns.map((ret) => (
							<div key={ret.id} className="card mb-3">
								<div className="card-header">
									<h4>Numéro de commande : {ret.id}</h4>
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
											{ret.products.map((product) => (
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
									<h5>Raison du retour :</h5>
									<p>{ret.reason}</p>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
}

export default ReturnsPage;
