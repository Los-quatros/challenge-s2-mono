import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import auth from "../assets/images/auth/auth.png";
import { useState } from "react";

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

function Register() {
	const [isVisible, setIsVisible] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	/**
	 * Change the visibility of the password
	 */
	const handleClick = () => setIsVisible(!isVisible);

	/**
	 * Register the user if their information are valid
	 * @param { MouseEvent } event The event of the form
	 */
	const register = (event) => {
		event.preventDefault();
		if (
			firstNameError === "" &&
			lastNameError === "" &&
			emailError === "" &&
			passwordError === ""
		) {
			const firstName = event.target.firstName.value;
			const lastName = event.target.lastName.value;
			const email = event.target.email.value;
			const password = event.target.pass.value;
			fetch("http://localhost:4000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ firstName, lastName, email, password }),
			})
				.then((response) => {
					if (response.status === 201) {
						navigate("/login");
						setTimeout(() => {
							setToast("Votre compte a bien été créé", "success");
						}, 500);
					}
				})
				.catch(() =>
					setToast("Une erreur est survenue lors de l'inscription", "error")
				);
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
			<ToastContainer />
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<form className="login100-form validate-form" onSubmit={register}>
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
									name="lastName"
									placeholder="Nom"
									onInput={(event) => isValidLastName(event.target.value)}
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
									onInput={(event) => isValidFirstName(event.target.value)}
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
									onInput={(event) => isValidEmail(event.target.value)}
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
									onInput={(event) => isValidPassword(event.target.value)}
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

export default Register;
