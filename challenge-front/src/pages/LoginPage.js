import "../styles/auth/login.css";
import "../styles/auth/util.css";

import grocery from "../images/auth/grocery.png";
import { useState } from "react";

function LoginPage() {
	const [isVisible, setIsVisible] = useState(false);
	const handleClick = () => setIsVisible(!isVisible);

	return (
		<>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<form className="login100-form validate-form">
							<span className="login100-form-title p-b-26">Bienvenue !</span>
							<span className="login100-form-title p-b-48">
								<img src={grocery} alt="logo" />
							</span>
							<div className="wrap-input100 validate-input">
								<input
									className="input100"
									type="text"
									name="email"
									placeholder="Adresse mail"
								/>
								<span className="focus-input100"></span>
							</div>
							<div className="wrap-input100 validate-input">
								<span className="btn-show-pass" onClick={handleClick}>
									{isVisible ? (
										<i className="fa fa-eye"></i>
									) : (
										<i className="fa fa-eye-slash"></i>
									)}
								</span>
								<input
									className="input100"
									type={isVisible ? "text" : "password"}
									name="pass"
									placeholder="Mot de passe"
								/>
								<span className="focus-input100"></span>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button className="login100-form-btn">Se connecter</button>
								</div>
							</div>
							<div className="text-center p-t-115">
								<span className="txt1"> Pas encore inscrit ? </span>
								<a className="txt2" href="/">
									S'enregistrer
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
