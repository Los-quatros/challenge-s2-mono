import { Link } from "react-router-dom";
import contactFormBackground from "../assets/images/contact/contact.png";

function ContactPage() {
	return (
		<>
			<div className="home">
				<div className="home_container">
					<div
						className="home_background"
						style={{ backgroundImage: `url(${contactFormBackground})` }}
					></div>
					<div className="home_content_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_content">
										<div className="breadcrumbs">
											<ul>
												<li>
													<Link to="/" className="text-dark">
														Accueil
													</Link>
												</li>
												<li className="text-dark active font-weight-bold">
													Contact
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ContactPage;
