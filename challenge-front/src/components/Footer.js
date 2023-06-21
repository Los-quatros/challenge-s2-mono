import footer from "../assets/images/footer/footer.png";

function Footer() {
	return (
		<>
			<div className="footer_overlay"></div>
			<footer className="footer">
				<div
					className="footer_background"
					style={{ backgroundImage: `url(${footer})` }}
				></div>
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="footer_content d-flex flex-lg-row flex-column align-items-center justify-content-lg-start justify-content-center">
								<div className="footer_logo">
									<a href="/">ElecShop.</a>
								</div>
								<div className="copyright ml-auto mr-auto">
									Copyright &copy; Tous droits réservés par
									<a
										href="https://github.com/Los-quatros"
										target="_blank"
										rel="noreferrer"
									>
										<span className="ml-1">Los quatros</span>
									</a>
								</div>
								<div className="footer_social ml-lg-auto">
									<ul>
										<li>
											<a href="/">
												<i className="fa fa-pinterest" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-instagram" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-facebook" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-twitter" aria-hidden="true"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
