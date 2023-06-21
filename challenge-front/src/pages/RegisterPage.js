import "../assets/styles/auth/auth.css";
import "../assets/styles/auth/util.css";

import { Link } from "react-router-dom";
import grocery from "../assets/images/auth/grocery.png";
import { useState } from "react";

function RegisterPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const handleClick = () => setIsVisible(!isVisible);

	/**
	 * Register the user if their information are valid
	 * @param { MouseEvent } e The event of the form
	 */
	const register = (e) => {
		e.preventDefault();
		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const email = e.target.email.value;
		const password = e.target.pass.value;
		if (
			firstNameError === "" &&
			lastNameError === "" &&
			emailError === "" &&
			passwordError === ""
		) {
			// TODO : call the API
			// TODO : redirect to the login page if success
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
	 * Check if the first name is valid
	 * @param { string } value The first name to check
	 */
	const isValidFirstName = (value) => {
		if (value === "") {
			setFirstNameError("");
		} else {
			if (value.length >= 3) {
				setFirstNameError("");
			} else {
				setFirstNameError("Le prénom doit contenir au moins 3 caractères");
			}
		}
	};

	/**
	 * Check if the last name is valid
	 * @param { string } value The last name to check
	 */
	const isValidLastName = (value) => {
		if (value === "") {
			setLastNameError("");
		} else {
			if (value.length >= 3) {
				setLastNameError("");
			} else {
				setLastNameError("Le nom doit contenir au moins 3 caractères");
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
						<form className="login100-form validate-form" onSubmit={register}>
							<span className="login100-form-title p-b-26">Bienvenue !</span>
							<span className="login100-form-title p-b-48">
								<img src={grocery} alt="Logo d'un marché" />
							</span>
							<div className="wrap-input100 validate-input">
								<input
									required
									className="input100"
									type="text"
									name="lastName"
									placeholder="Nom"
									onInput={(e) => isValidLastName(e.target.value)}
								/>
								<span className="focus-input100"></span>
							</div>
							{lastNameError !== "" && (
								<div
									className="text-danger"
									style={{ marginTop: "-20px", marginBottom: "20px" }}
								>
									{lastNameError}
								</div>
							)}
							<div className="wrap-input100 validate-input">
								<input
									required
									className="input100"
									type="text"
									name="firstName"
									placeholder="Prénom"
									onInput={(e) => isValidFirstName(e.target.value)}
								/>
								<span className="focus-input100"></span>
							</div>
							{firstNameError !== "" && (
								<div
									className="text-danger"
									style={{ marginTop: "-20px", marginBottom: "20px" }}
								>
									{firstNameError}
								</div>
							)}
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
									<button className="login100-form-btn">S'enregistrer</button>
								</div>
							</div>
							<div className="text-center p-t-115">
								<span className="txt1">Déjà un compte ?</span>
								<Link className="txt2 ml-1" to="/login">
									Se connecter
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterPage;
