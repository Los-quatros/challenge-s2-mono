import headPhoneAdvertisement from "../../assets/images/home/advertisements/advertisement_3.png";

function AdvertisementProductPage() {
	return (
		<div className="avds_xl">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="avds_xl_container clearfix">
							<div
								className="avds_xl_background"
								style={{ backgroundImage: `url(${headPhoneAdvertisement})` }}
							></div>
							<div className="avds_xl_content">
								<div className="avds_title">Casques audio</div>
								<div className="avds_text">
									Découvrez une expérience audio exceptionnelle avec nos casques
									de musique haut de gamme.
								</div>
								<div className="avds_link avds_xl_link">
									<a href="/">Explorer</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdvertisementProductPage;
