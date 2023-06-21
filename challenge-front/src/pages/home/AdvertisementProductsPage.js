import discountAdvertisement from "../../assets/images/home/advertisements/advertisement_4.png";
import phoneAdvertisement from "../../assets/images/home/advertisements/advertisement_1.png";
import photoAdvertisement from "../../assets/images/home/advertisements/advertisement_2.png";

function AdvertisementProductsPage() {
	return (
		<div className="avds">
			<div className="avds_container d-flex flex-lg-row flex-column align-items-start justify-content-between">
				<div className="avds_small">
					<div
						className="avds_background"
						style={{ backgroundImage: `url(${photoAdvertisement})` }}
					></div>
					<div className="avds_small_inner">
						<div className="avds_discount_container">
							<img src={discountAdvertisement} alt="Remise fond" />
							<div>
								<div className="avds_discount">
									<div>
										20<span>%</span>
									</div>
									<div>Remise</div>
								</div>
							</div>
						</div>
						<div className="avds_small_content">
							<div className="avds_title">Téléphones</div>
							<div className="avds_link">
								<a href="/">Explorer</a>
							</div>
						</div>
					</div>
				</div>
				<div className="avds_large">
					<div
						className="avds_background"
						style={{ backgroundImage: `url(${phoneAdvertisement})` }}
					></div>
					<div className="avds_large_container">
						<div className="avds_large_content">
							<div className="avds_title">Caméras professionnelles</div>
							<div className="avds_text">
								Capturez des moments inoubliables avec une qualité
								professionnelle grâce à nos caméras haut de gamme. Donnez vie à
								vos histoires et exprimez votre créativité avec des images d'une
								netteté époustouflante.
							</div>
							<div className="avds_link avds_link_large">
								<a href="/">Explorer</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdvertisementProductsPage;
