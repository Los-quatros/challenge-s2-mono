import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

function PaymentSuccess() {
	const { id } = useParams();
	const [display, setDisplay] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setDisplay(display);
		if (display) {
			document.getElementById("myModal").classList.add("show");
			document.getElementById("myModal").style.display = "block";
		}
	}, [display]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(
			`${process.env.REACT_APP_BASE_API_URL}/orders/users/${decodedToken.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((data) => {
				if (data) {
					const order = data.find((order) => order.orderId === id);
					if (order) {
						fetch(
							`${process.env.REACT_APP_BASE_API_URL}/payment/success/${order.orderId}`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${token}`,
								},
								body: JSON.stringify({
									paymentId: id,
								}),
							}
						)
							.then((response) => {
								if (response.status === 201) {
									return response.text();
								}
							})
							.then((data) => {
								setDisplay(false);
								if (data) {
									setDisplay(true);
									return;
								} else {
									setToast(
										"Une erreur est survenue lors de la validation de votre commande",
										"error"
									);
								}
							})
							.catch(() => {
								setToast(
									"Une erreur est survenue lors de la validation de votre commande",
									"error"
								);
							});
					} else {
						navigate("/");
						setTimeout(() => {
							setToast("Commande introuvable", "error");
						}, 500);
					}
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération de votre commande",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération de votre commande",
					"error"
				);
			});
	}, [id, navigate]);

	return (
		display && (
			<div id="myModal" className="modal fade">
				<div className="modal-dialog modal-confirm">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title w-100 text-center">
								Merci pour votre commande !
								<p className="mt-3 mb-0" style={{ fontSize: "16px" }}>
									<strong>#{id}</strong>
								</p>
							</h4>
						</div>
						<div className="modal-body">
							<p className="text-center mb-0">
								Votre paiement a bien été effectué avec succès.
							</p>
						</div>
						<div className="modal-footer">
							<Link to="/" className="btn btn-success btn-block p-0">
								<button
									className="btn btn-success btn-block"
									data-dismiss="modal"
								>
									Retour à l'accueil
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default PaymentSuccess;
