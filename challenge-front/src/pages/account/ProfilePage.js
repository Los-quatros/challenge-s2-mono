import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import HeaderPage from "./HeaderPage";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

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

function ProfilePage() {
	const { name } = useParams();
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

			if (confirmPassword.length >= 1) {
				if (password === confirmPassword) {
					setConfirmPasswordError("");
				} else {
					setConfirmPasswordError("Les mots de passe ne correspondent pas");
				}
			}
		}
	}, [password, confirmPassword]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/users/${decodedToken.id}`, {
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
					setLastName(data.lastName);
					setFirstName(data.firstName);
					setEmail(data.email);
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération des données",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération des données",
					"error"
				);
			});
	}, []);

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	/**
	 * Update the user profile
	 * @param { Event } event The event of the div
	 */
	const update = async (event) => {
		event.preventDefault();

		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);

		if (
			lastNameError === "" &&
			firstNameError === "" &&
			emailError === "" &&
			passwordError === "" &&
			confirmPasswordError === ""
		) {
			const body = {
				lastName: lastName,
				firstName: firstName,
				email: email,
			};

			if (password !== "") {
				body.password = password;
			}

			fetch(`http://localhost:4000/users/${decodedToken.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ...body }),
			})
				.then((response) => {
					if (response.status === 200) {
						setToast("Profil mis à jour avec succès", "success");
						setPassword("");
						setConfirmPassword("");
					} else {
						setToast(
							"Une erreur est survenue lors de la mise à jour des données personnelles",
							"error"
						);
					}
				})
				.catch(() => {
					setToast(
						"Une erreur est survenue lors de la mise à jour du profil",
						"error"
					);
				});
		} else {
			setToast("Veuillez corriger remplir correctement les champs", "info");
		}
	};

	return (
		<>
			<ToastContainer />
			<div id="content" className="p-4 p-md-5">
				<HeaderPage />
				<div className="row">
					<div className="col-12">
						<form className="file-upload">
							<div className="row gx-5">
								<div className="col-12 mb-3 mb-xxl-0">
									<div className="bg-secondary-soft rounded">
										<div className="row g-3">
											<div className="col-12">
												<label htmlFor="lastName" className="form-label">
													Nom<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="John"
													id="lastName"
													value={lastName}
													onInput={(event) => setLastName(event.target.value)}
												/>
											</div>
										</div>
										{lastNameError !== "" && (
											<div className="text-danger mt-2">{lastNameError}</div>
										)}
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="firstName" className="form-label">
													Prénom<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="Doe"
													id="firstName"
													value={firstName}
													onInput={(event) => setFirstName(event.target.value)}
												/>
											</div>
										</div>
										{firstNameError !== "" && (
											<div className="text-danger mt-2">{firstNameError}</div>
										)}
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="email" className="form-label">
													Adresse email<span className="red">*</span>
												</label>
												<input
													required
													type="email"
													className="form-control"
													id="email"
													placeholder="johndoe@hotmail.fr"
													value={email}
													onInput={(event) => setEmail(event.target.value)}
												/>
											</div>
										</div>
										{emailError !== "" && (
											<div className="text-danger mt-2">{emailError}</div>
										)}
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="password" className="form-label">
													Nouveau mot de passe<span className="red">*</span>
												</label>
												<input
													required
													placeholder="******"
													type="password"
													className="form-control"
													id="password"
													value={password}
													onInput={(event) => setPassword(event.target.value)}
												/>
											</div>
										</div>
										{passwordError !== "" && (
											<div className="text-danger mt-2">{passwordError}</div>
										)}
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="confirmPassword" className="form-label">
													Confirmation mot de passe{" "}
													<span className="red">*</span>
												</label>
												<input
													required
													placeholder="******"
													type="password"
													className="form-control"
													id="confirmPassword"
													value={confirmPassword}
													onInput={(event) =>
														setConfirmPassword(event.target.value)
													}
												/>
											</div>
										</div>
										{confirmPasswordError !== "" && (
											<div className="text-danger mt-2">
												{confirmPasswordError}
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="gap-3 d-md-flex text-center" onClick={update}>
								<button className="button profile_button">
									<span>Mettre à jour</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
