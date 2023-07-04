import { Link, useNavigate, useParams } from "react-router-dom";
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

function Register() {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [shopName, setShopName] = useState("");
	const [shopDescription, setShopDescription] = useState("");
	const [shopError, setShopError] = useState("");
	const [shopDescriptionError, setShopDescriptionError] = useState("");
	const { name } = useParams();

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
		if (firstName === "") {
			setFirstNameError("");
		} else {
			if (firstName.length >= 3) {
				setFirstNameError("");
			} else {
				setFirstNameError("Le prénom doit contenir au moins 3 caractères");
			}
		}
	}, [firstName]);

	useEffect(() => {
		if (lastName === "") {
			setLastNameError("");
		} else {
			if (lastName.length >= 3) {
				setLastNameError("");
			} else {
				setLastNameError("Le nom doit contenir au moins 3 caractères");
			}
		}
	}, [lastName]);

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

	useEffect(() => {
		if (shopName === "") {
			setShopError("");
		} else {
			if (shopName.length >= 3) {
				setShopError("");
			} else {
				setShopError("Le nom du magasin doit contenir au moins 3 caractères");
			}
		}
	}, [shopName]);

	useEffect(() => {
		if (shopDescription === "") {
			setShopDescriptionError("");
		} else {
			if (shopDescription.length >= 10) {
				setShopDescriptionError("");
			} else {
				setShopDescriptionError(
					"La description du magasin doit contenir au moins 10 caractères"
				);
			}
		}
	}, [shopDescription]);

	/**
	 * Change the visibility of the password input
	 */
	const handleClick = () => setIsVisible(!isVisible);

	/**
	 * Register the user if their information are valid
	 * @param { MouseEvent } event The event of the form
	 */
	const register = (event) => {
		event.preventDefault();

		if (name === "seller") {
			if (
				(firstNameError === "",
				lastNameError === "",
				emailError === "" &&
					passwordError === "" &&
					shopError === "" &&
					shopDescriptionError === "")
			) {
				fetch("http://localhost:4000/users/sellers", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName,
						lastName,
						email,
						password,
						name: shopName,
						description: shopDescription,
					}),
				})
					.then((response) => {
						if (response.status === 201) {
							navigate("/login");
							setTimeout(() => {
								setToast("Votre compte a bien été créé", "success");
							}, 500);
						} else {
							setToast(
								"Une erreur est survenue lors de l'inscription",
								"error"
							);
						}
					})
					.catch(() =>
						setToast("Une erreur est survenue lors de l'inscription", "error")
					);
			}
		} else {
			if (
				firstNameError === "" &&
				lastNameError === "" &&
				emailError === "" &&
				passwordError === ""
			) {
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
						} else {
							setToast(
								"Une erreur est survenue lors de l'inscription",
								"error"
							);
						}
					})
					.catch(() =>
						setToast("Une erreur est survenue lors de l'inscription", "error")
					);
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
									onInput={(event) => setLastName(event.target.value)}
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
									onInput={(event) => setFirstName(event.target.value)}
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
							{name === "seller" && (
								<>
									<div className="wrap-input100 validate-input">
										<input
											required
											className="input100"
											type="text"
											name="shopName"
											placeholder="Nom de la boutique"
											onInput={(event) => setShopName(event.target.value)}
										/>
										<span className="focus-input100"></span>
									</div>
									{shopError !== "" && (
										<div
											className="text-danger"
											style={{ marginTop: "-20px", marginBottom: "20px" }}
										>
											{shopError}
										</div>
									)}
									<div className="wrap-input100 validate-input">
										<input
											required
											className="input100"
											type="text"
											name="description"
											placeholder="Description de la boutique"
											onInput={(event) =>
												setShopDescription(event.target.value)
											}
										/>
										<span className="focus-input100"></span>
									</div>
									{shopDescriptionError !== "" && (
										<div
											className="text-danger"
											style={{ marginTop: "-20px", marginBottom: "20px" }}
										>
											{shopDescriptionError}
										</div>
									)}
								</>
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
									<button className="login100-form-btn">S'enregistrer</button>
								</div>
							</div>
							<div className="text-center p-t-35">
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
