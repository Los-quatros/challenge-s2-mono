import headPhoneBackground from "../../assets/images/categories/headphones/headphone_1.png";

function HeadPhonePage() {
	return (
		<>
			<div className="home">
				<div className="home_container">
					<div
						className="home_background"
						style={{ backgroundImage: `url(${headPhoneBackground})` }}
					></div>
					<div className="home_content_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_content">
										<div className="home_title ">
											Catégories<span>.</span>
										</div>
										<div className="home_text">
											<p>
												Plongez au cœur d'une expérience sonore immersive et
												exceptionnelle avec nos casques de musique haut de
												gamme. Que vous soyez un audiophile passionné ou que
												vous cherchiez simplement à profiter pleinement de votre
												musique préférée, nos casques vous offriront une qualité
												audio inégalée.
											</p>
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

export default HeadPhonePage;
