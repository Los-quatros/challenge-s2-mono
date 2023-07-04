import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import auth from "../assets/images/auth/auth.png";
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

function NewPassword() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	useEffect(() => {
		if (email === "") {
			setEmailError("");
		} else {
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if (regex.test(email)) {
				setEmailError("");
			} else {
				setEmailError("Entrer une adresse mail valide");
			}
		}
	}, [email]);

	/**
	 * Send reset password email to user
	 * @param { MouseEvent } event The event of the form
	 */
	const sendResetPasswordEmail = (event) => {
		event.preventDefault();
		if (emailError === "") {
			fetch(`http://localhost:4000/users/${email}/reset-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (response.status === 200) {
						navigate("/login");
						setTimeout(() => {
							setToast(
								"Un mail de réinitialisation vous a été envoyé",
								"success"
							);
						}, 500);
					} else {
						setToast(
							"Une erreur est survenue lors du mail de réinitialisation du mot de passe",
							"error"
						);
					}
				})
				.catch(() =>
					setToast(
						"Une erreur est survenue lors du mail de réinitialisation du mot de passe",
						"error"
					)
				);
		}
	};

	return (
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100">
					<form
						className="login100-form validate-form"
						onSubmit={sendResetPasswordEmail}
					>
						<span className="login100-form-title p-b-26">Bienvenue !</span>
						<Link to="/">
							<span className="login100-form-title p-b-48">
								<img src={auth} alt="Logo d'un marché" />
							</span>
						</Link>
						<div className="wrap-input100 validate-input">
							<input
								required
								className="input100"
								type="text"
								name="email"
								placeholder="Adresse mail"
								onInput={(event) => setEmail(event.target.value)}
							/>
							<span className="focus-input100"></span>
						</div>
						{emailError !== "" && (
							<div
								className="text-danger"
								style={{ marginTop: "-20px", marginBottom: "20px" }}
							>
								{emailError}
							</div>
						)}
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn"></div>
								<button className="login100-form-btn">
									Réinitialiser le mot de passe
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewPassword;
