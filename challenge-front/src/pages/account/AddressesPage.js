import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import SidebarPage from "./HeaderPage";
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

function AddressesPage() {
	const [addresses, setAddresses] = useState([]);
	const [isChanged, setIsChanged] = useState(false);
	const { name } = useParams();

	useEffect(() => {
		resetAndSetActiveLink(name);
	}, [name]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		fetch(`http://localhost:4000/addresses/users/${decodedToken.id}`, {
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
					data.forEach((address) => {
						setAddresses([
							...addresses,
							{
								zip: { value: address.zip, error: "" },
								country: { value: address.country, error: "" },
								street: { value: address.street, error: "" },
								city: { value: address.city, error: "" },
							},
						]);
					});
				}
			})
			.catch(() => {
				setToast(
					"Une erreur est survenue lors de la récupération des données",
					"error"
				);
			});
	}, [addresses]);

	/**
	 * Add a new address
	 */
	const addAddress = () => {
		setAddresses([
			...addresses,
			{
				zip: { value: "", error: "" },
				country: { value: "", error: "" },
				street: { value: "", error: "" },
				city: { value: "", error: "" },
			},
		]);
	};

	/**
	 * Handle the change of an input in the form
	 * @param { number } index Index of the address in the list
	 * @param { string } field Field name
	 * @param { string } value Field value
	 */
	const handleChange = (index, field, value) => {
		const updatedAddresses = [...addresses];
		updatedAddresses[index][field].value = value;
		if (field === "zip") {
			if (value === "") {
				setIsChanged(false);
				updatedAddresses[index][field].error = "Le code postal est obligatoire";
			} else {
				const regex = /^[0-9]{5}$/;
				if (regex.test(value)) {
					updatedAddresses[index][field].error = "";
				} else {
					updatedAddresses[index][field].error =
						"Le code postal doit contenir 5 chiffres";
				}
				setIsChanged(true);
			}
		} else if (field === "country") {
			if (value === "") {
				setIsChanged(false);
				updatedAddresses[index][field].error = "Le pays est obligatoire";
			} else {
				if (value.length >= 5) {
					updatedAddresses[index][field].error = "";
				} else {
					updatedAddresses[index][field].error =
						"Le pays doit contenir au moins 5 caractères";
				}
				setIsChanged(true);
			}
		} else if (field === "street") {
			if (value === "") {
				setIsChanged(false);
				updatedAddresses[index][field].error = "La rue est obligatoire";
			} else {
				if (value.length >= 5) {
					updatedAddresses[index][field].error = "";
				} else {
					updatedAddresses[index][field].error =
						"La rue doit contenir au moins 5 caractères";
				}
				setIsChanged(true);
			}
		} else if (field === "city") {
			if (value === "") {
				setIsChanged(false);
				updatedAddresses[index][field].error = "La ville est obligatoire";
			} else {
				if (value.length >= 5) {
					updatedAddresses[index][field].error = "";
				} else {
					updatedAddresses[index][field].error =
						"La ville doit contenir au moins 5 caractères";
				}
				setIsChanged(true);
			}
		}
		setAddresses(updatedAddresses);
	};

	/**
	 * Delete an address from the list
	 * @param { number } index Index of the address to delete
	 */
	const deleteAddress = (index) => {
		const updatedAddresses = [...addresses];
		updatedAddresses.splice(index, 1);
		setAddresses(updatedAddresses);
	};

	/**
	 * Save the address in the database
	 * @param { Event } event Event div on click
	 * @param { number } index Index of the address in the list
	 */
	const saveAddress = (event, index) => {
		event.preventDefault();

		const token = localStorage.getItem("token");
		const decodedToken = jwt_decode(token);
		const street = addresses[index].street;
		const zip = addresses[index].zip;
		const country = addresses[index].country;
		const city = addresses[index].city;

		if (
			street.value === "" ||
			zip.value === "" ||
			country.value === "" ||
			city.value === ""
		) {
			setToast("Veuillez remplir tous les champs", "info");
		} else {
			fetch("http://localhost:4000/addresses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					street: street.value,
					zip: Number(zip.value),
					country: country.value,
					user_id: decodedToken.id,
					city: city.value,
				}),
			})
				.then((response) => {
					if (response.status === 201) {
						return response.json();
					} else {
						setToast(
							"Une erreur est survenue lors de l'ajout de l'adresse",
							"error"
						);
					}
				})
				.then((data) => {
					if (data) {
						setIsChanged(false);
						setToast("Adresse ajoutée avec succès", "success");
					} else {
						setToast(
							"Une erreur est survenue lors de l'ajout de l'adresse",
							"error"
						);
					}
				})
				.catch(() => {
					setToast(
						"Une erreur est survenue lors de l'ajout de l'adresse",
						"error"
					);
				});
		}
	};

	return (
		<>
			<ToastContainer />
			<div id="content" className="p-4 p-md-5">
				<SidebarPage />
				<div className="row">
					<div className="col-12 p-0">
						<div
							className="gap-3 d-md-flex text-center"
							style={{ marginBottom: "40px" }}
						>
							<button
								className="button addresses_button mt-0"
								onClick={addAddress}
							>
								<span>Ajouter une adresse</span>
							</button>
						</div>
						<div className="row gx-5">
							{addresses.map((address, index) => (
								<div key={index} className="col-12 mb-3 mb-xxl-0">
									<div className="bg-secondary-soft rounded">
										<hr
											className="hr hr-blurry"
											style={{ marginTop: index === 0 ? "0px" : "16px" }}
										/>
										<div className="row g-3">
											<div className="col-12">
												<label
													htmlFor={`street${index}`}
													className="form-label"
												>
													Rue<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="11 rue du general emapain"
													id={`street${index}`}
													value={address.street.value}
													onInput={(event) =>
														handleChange(index, "street", event.target.value)
													}
												/>
												{address.street.error !== "" && (
													<div className="text-danger mt-2">
														{address.street.error}
													</div>
												)}
											</div>
											<div className="col-12 mt-2">
												<label htmlFor={`city${index}`} className="form-label">
													Ville<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="Saint-Ouen-l'Aumône"
													id={`city${index}`}
													value={address.city.value}
													onInput={(event) =>
														handleChange(index, "city", event.target.value)
													}
												/>
												{address.city.error !== "" && (
													<div className="text-danger mt-2">
														{address.city.error}
													</div>
												)}
											</div>
											<div className="col-12 mt-2">
												<label htmlFor={`zip${index}`} className="form-label">
													Code postal<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="95350"
													id={`zip${index}`}
													value={address.zip.value}
													onInput={(event) =>
														handleChange(index, "zip", event.target.value)
													}
												/>
												{address.zip.error !== "" && (
													<div className="text-danger mt-2">
														{address.zip.error}
													</div>
												)}
											</div>
											<div className="col-12 mt-2">
												<label
													htmlFor={`country${index}`}
													className="form-label"
												>
													Pays<span className="red">*</span>
												</label>
												<input
													required
													type="text"
													className="form-control"
													placeholder="France"
													id={`country${index}`}
													value={address.country.value}
													onInput={(event) =>
														handleChange(index, "country", event.target.value)
													}
												/>
												{address.country.error !== "" && (
													<div className="text-danger mt-2">
														{address.country.error}
													</div>
												)}
											</div>
											<div className="col-12 mt-2 d-flex">
												<div className="gap-3 d-md-flex text-center mr-3">
													<button
														onClick={(event) => deleteAddress(event, index)}
														className="button addresses_button"
														style={{ height: "50px" }}
													>
														<span>Supprimer l'adresse</span>
													</button>
												</div>
												{isChanged && (
													<div className="gap-3 d-md-flex text-center">
														<button
															className="button addresses_button"
															onClick={(event) => saveAddress(event, index)}
															style={{ height: "50px" }}
														>
															<span>Enregistrer l'adresse</span>
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddressesPage;
