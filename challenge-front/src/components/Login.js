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
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

function Login() {
	const [isVisible, setIsVisible] = useState(false);
	const [emailError, setEmailError] = useState("");
	const navigate = useNavigate();
	const [passwordError, setPasswordError] = useState("");
	const handleClick = () => setIsVisible(!isVisible);

	/**
	 * Login the user if their information are valid
	 * @param { MouseEvent } event The event of the form
	 */
	const login = (event) => {
		event.preventDefault();
		if (emailError === "" && passwordError === "") {
			const email = event.target.email.value;
			const password = event.target.pass.value;
			fetch("http://localhost:4000/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				.then((response) => {
					if (response.status === 200) {
						return response.text();
					}
				})
				.then((data) => {
					if (data) {
						localStorage.setItem("token", data);
						navigate("/");
					}
				})
				.catch(() =>
					setToast("Une erreur est survenue lors de la connexion", "error")
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
						<form className="login100-form validate-form" onSubmit={login}>
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

export default Login;
