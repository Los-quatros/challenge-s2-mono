import { Link, useLocation, useNavigate } from "react-router-dom";
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

function ResetPassword() {
	const navigate = useNavigate();
	const location = useLocation();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const handleClickConfirmPassword = () =>
		setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
	const [token, setToken] = useState("");

	/**
	 * Handle state of password visibility
	 */
	const handleClickPassword = () => setIsPasswordVisible(!isPasswordVisible);

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
		const searchParams = new URLSearchParams(location.search);
		if (!token) {
			setToken(searchParams.get("token"));
		}
	}, [token, navigate, location.search]);

	/**
	 * Update the password of the user
	 * @param { MouseEvent } event The event of the form
	 */
	const updatePassword = (event) => {
		event.preventDefault();
		if (passwordError === "" && confirmPasswordError === "") {
			fetch(`http://localhost:4000/users/reset-password/${token}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: password,
				}),
			})
				.then((response) => {
					if (response.status === 200) {
						navigate("/login");
						setTimeout(() => {
							setToast("Votre mot de passe a été modifié", "success");
						}, 500);
					} else {
						setToast(
							"Une erreur est survenue lors de la modification du mot de passe",
							"error"
						);
					}
				})
				.catch(() =>
					setToast(
						"Une erreur est survenue lors de la modification du mot de passe",
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
						onSubmit={updatePassword}
					>
						<span className="login100-form-title p-b-26">Bienvenue !</span>
						<Link to="/">
							<span className="login100-form-title p-b-48">
								<img src={auth} alt="Logo d'un marché" />
							</span>
						</Link>
						<div className="wrap-input100 validate-input">
							<span className="btn-show-pass" onClick={handleClickPassword}>
								{isPasswordVisible ? (
									<i className="fa fa-eye"></i>
								) : (
									<i className="fa fa-eye-slash"></i>
								)}
							</span>
							<input
								required
								className="input100"
								type={isPasswordVisible ? "text" : "password"}
								name="pass"
								placeholder="Nouveau mot de passe"
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
						<div className="wrap-input100 validate-input">
							<span
								className="btn-show-pass"
								onClick={handleClickConfirmPassword}
							>
								{isConfirmPasswordVisible ? (
									<i className="fa fa-eye"></i>
								) : (
									<i className="fa fa-eye-slash"></i>
								)}
							</span>
							<input
								required
								className="input100"
								type={isConfirmPasswordVisible ? "text" : "password"}
								name="pass"
								placeholder="Confirmation mot de passe"
								onInput={(event) => setConfirmPassword(event.target.value)}
							/>
							<span className="focus-input100"></span>
						</div>
						{confirmPasswordError !== "" && (
							<div
								className="text-danger"
								style={{ marginTop: "-20px", marginBottom: "20px" }}
							>
								{confirmPasswordError}
							</div>
						)}
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn"></div>
								<button className="login100-form-btn">Mettre à jour</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
