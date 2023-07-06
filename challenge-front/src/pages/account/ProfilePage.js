import { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
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

function ProfilePage({ role }) {
	const { name } = useParams();
	const [lastName, setLastName] = useState("");
	const [shop, setShop] = useState("");
	const [description, setDescription] = useState("");
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
		document
			.querySelector(`#account-menu`)
			.querySelectorAll("li")
			.forEach((li) => {
				if (li.id === `account-${name}`) {
					li.classList.add("active");
				} else {
					li.classList.remove("active");
				}
			});
	}, [name]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`${process.env.REACT_APP_BASE_API_URL}/users/${decodedToken.id}`, {
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
					if (role === "seller") {
						fetch(
							`${process.env.REACT_APP_BASE_API_URL}/sellers/${data.sellerId}`,
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
									setShop(data.name);
									setDescription(data.description);
								} else {
									setToast(
										"Une erreur est survenue lors de la récupération de vos données",
										"error"
									);
								}
							})
							.catch(() => {
								setToast(
									"Une erreur est survenue lors de la récupération de vos données",
									"error"
								);
							});
					}
				} else {
					setToast(
						"Une erreur est survenue lors de la récupération de vos données",
						"error"
					);
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération de vos données",
					"error"
				);
			});
	}, [role]);

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

			fetch(`${process.env.REACT_APP_BASE_API_URL}/users/${decodedToken.id}`, {
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
		<div className="row">
			<div className="col-12">
				<form className="file-upload">
					<div className="row gx-5">
						<div className="col-12 mb-3 mb-xxl-0">
							<div className="bg-secondary-soft rounded">
								{role === "seller" && (
									<>
										<div className="row g-3">
											<div className="col-12">
												<label htmlFor="shop" className="form-label">
													Boutique<span className="red">*</span>
												</label>
												<input
													disabled
													type="text"
													className="form-control"
													placeholder="La boutique de John"
													id="shop"
													value={shop}
													onInput={(event) => setShop(event.target.value)}
												/>
											</div>
										</div>
										<div className="row g-3 mt-2 mb-2">
											<div className="col-12">
												<label htmlFor="description" className="form-label">
													Description<span className="red">*</span>
												</label>
												<input
													required
													disabled
													type="text"
													className="form-control"
													placeholder="Description de la boutique"
													id="description"
													value={description}
													onInput={(event) =>
														setDescription(event.target.value)
													}
												/>
											</div>
										</div>
									</>
								)}
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
											Confirmation mot de passe <span className="red">*</span>
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
									<div className="text-danger mt-2">{confirmPasswordError}</div>
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
	);
}

export default ProfilePage;
