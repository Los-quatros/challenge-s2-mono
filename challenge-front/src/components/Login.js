import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import auth from "../assets/images/auth/auth.png";

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

function Login() {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	/**
	 * Change the visibility of the password input
	 */
	const handleClick = () => setIsVisible(!isVisible);

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

	useEffect(() => {
		if (password === "") {
			setPasswordError("");
		} else {
			if (password.length >= 6) {
				setPasswordError("");
			} else {
				setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
			}
		}
	}, [password]);

	/**
	 * Login the user if their information are valid
	 * @param { MouseEvent } event The event of the form
	 */
	const login = (event) => {
		event.preventDefault();
		if (emailError === "" && passwordError === "") {
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
						setTimeout(() => {
							setToast("Vous êtes connecté", "success");
						}, 500);
					} else {
						setToast("Une erreur est survenue lors de la connexion", "error");
					}
				})
				.catch(() =>
					setToast("Une erreur est survenue lors de la connexion", "error")
				);
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
									onInput={(event) => setPassword(event.target.value)}
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
							<div className="text-center p-t-35">
								<span className="txt1">Mot de passe oublié ?</span>
								<Link className="txt2 ml-1" to="/new-password">
									Réinitialiser
								</Link>
								<br />
								<span className="txt1">Pas encore inscrit ?</span>
								<Link className="txt2 ml-1" to="/register/user">
									S'enregistrer
								</Link>
								<br />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
