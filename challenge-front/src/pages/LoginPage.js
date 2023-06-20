import "../assets/styles/auth/auth.css";
import "../assets/styles/auth/util.css";

import { Link } from "react-router-dom";
import grocery from "../assets/images/auth/grocery.png";
import { useState } from "react";

function LoginPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const handleClick = () => setIsVisible(!isVisible);

	/**
	 * Login the user if their information are valid
	 * @param { MouseEvent } e The event of the form
	 */
	const login = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.pass.value;
		if (emailError === "" && passwordError === "") {
			// TODO : call the API
			// TODO : redirect to the home page if success
			// TODO : toast message if error
		}
	};

	/**
	 * Check if the email is valid
	 * @param { string } value The email to check
	 */
	const isValidEmail = (value) => {
		if (value === "") {
			setEmailError("");
		} else {
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if (regex.test(value)) {
				setEmailError("");
			} else {
				setEmailError("Entrer une adresse mail valide");
			}
		}
	};

	/**
	 * Check if the password is valid
	 * @param { string } value The password to check
	 */
	const isValidPassword = (value) => {
		if (value === "") {
			setPasswordError("");
		} else {
			if (value.length >= 6) {
				setPasswordError("");
			} else {
				setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
			}
		}
	};

	return (
		<>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<form className="login100-form validate-form" onSubmit={login}>
							<span className="login100-form-title p-b-26">Bienvenue !</span>
							<span className="login100-form-title p-b-48">
								<img src={grocery} alt="Grocery logo" />
							</span>
							<div className="wrap-input100 validate-input">
								<input
									required
									className="input100"
									type="text"
									name="email"
									placeholder="Adresse mail"
									onInput={(e) => isValidEmail(e.target.value)}
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
							<div className="wrap-input100 validate-input">
								<span className="btn-show-pass" onClick={handleClick}>
									{isVisible ? (
										<i className="fa fa-eye"></i>
									) : (
										<i className="fa fa-eye-slash"></i>
									)}
								</span>
								<input
									required
									className="input100"
									type={isVisible ? "text" : "password"}
									name="pass"
									placeholder="Mot de passe"
									onInput={(e) => isValidPassword(e.target.value)}
								/>
								<span className="focus-input100"></span>
							</div>
							{passwordError !== "" && (
								<div
									className="text-danger"
									style={{ marginTop: "-20px", marginBottom: "20px" }}
								>
									{passwordError}
								</div>
							)}
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button className="login100-form-btn">Se connecter</button>
								</div>
							</div>
							<div className="text-center p-t-115">
								<span className="txt1">Pas encore inscrit ?</span>
								<Link className="txt2 ml-1" to="/register">
									S'enregistrer
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
