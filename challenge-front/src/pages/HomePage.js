import "../assets/styles/home/main.css";
import "../assets/styles/home/responsive.css";
import "../assets/styles/home/owl.carousel.css";
import "../assets/styles/home/owl.theme.default.css";
import "../assets/styles/home/animate.css";

import discount from "../assets/images/home/discount.png";
import homeSlider from "../assets/images/home/home-slider.jpg";
import phoneAdvertisement from "../assets/images/home/avds-phone.jpg";
import photoAdvertisement from "../assets/images/home/avds-photo.jpg";
import { useEffect } from "react";

const $ = window.$;

/**
 * Init home slider
 */
function initHomeSlider() {
	if ($(".home_slider").length) {
		const homeSlider = $(".home_slider");

		homeSlider.owlCarousel({
			items: 1,
			autoplay: true,
			autoplayTimeout: 5000,
			loop: true,
			nav: false,
			smartSpeed: 1200,
			dotsSpeed: 1200,
			fluidSpeed: 1200,
		});

		if ($(".home_slider_custom_dot").length) {
			$(".home_slider_custom_dot").on("click", function () {
				$(".home_slider_custom_dot").removeClass("active");
				$(this).addClass("active");
				homeSlider.trigger("to.owl.carousel", [$(this).index(), 1200]);
			});
		}

		homeSlider.on("changed.owl.carousel", function (event) {
			$(".home_slider_custom_dot").removeClass("active");
			$(".home_slider_custom_dots li").eq(event.page.index).addClass("active");
		});

		function setAnimation(_elem, _InOut) {
			var animationEndEvent =
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

			_elem.each(function () {
				var $elem = $(this);
				var $animationType = "animated " + $elem.data("animation-" + _InOut);

				$elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType);
				});
			});
		}

		homeSlider.on("change.owl.carousel", function (event) {
			var $currentItem = $(".home_slider_item", homeSlider).eq(
				event.item.index
			);
			var $elemToAnimate = $currentItem.find("[data-animation-out]");
			setAnimation($elemToAnimate, "out");
		});

		homeSlider.on("changed.owl.carousel", function (event) {
			var $currentItem = $(".home_slider_item", homeSlider).eq(
				event.item.index
			);
			var $elemToAnimate = $currentItem.find("[data-animation-in]");
			setAnimation($elemToAnimate, "in");
		});
	}
}

function HomePage() {
	useEffect(() => {
		initHomeSlider();
	}, []);

	return (
		<>
			<div className="home">
				<div className="home_slider_container">
					<div className="owl-carousel owl-theme home_slider">
						<div className="owl-item home_slider_item">
							<div
								className="home_slider_background"
								style={{ backgroundImage: `url(${homeSlider})` }}
							></div>
							<div className="home_slider_content_container">
								<div className="container">
									<div className="row">
										<div className="col">
											<div
												className="home_slider_content"
												data-animation-in="fadeIn"
												data-animation-out="animate-out fadeOut"
											>
												<div className="home_slider_title">
													Une nouvelle expérience de boutique en ligne.
												</div>
												<div className="home_slider_subtitle">
													ÉlectroMarket : L'essentiel de la technologie à portée
													de main. Explorez notre univers high-tech dès
													maintenant !
												</div>
												<div className="button button_light home_button">
													<a href="/">Explorer</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="owl-item home_slider_item">
							<div
								className="home_slider_background"
								style={{ backgroundImage: `url(${homeSlider})` }}
							></div>
							<div className="home_slider_content_container">
								<div className="container">
									<div className="row">
										<div className="col">
											<div
												className="home_slider_content"
												data-animation-in="fadeIn"
												data-animation-out="animate-out fadeOut"
											>
												<div className="home_slider_title">
													Une nouvelle expérience de boutique en ligne.
												</div>
												<div className="home_slider_subtitle">
													ÉlectroMarket : L'essentiel de la technologie à portée
													de main. Explorez notre univers high-tech dès
													maintenant !
												</div>
												<div className="button button_light home_button">
													<a href="/">Explorer</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="owl-item home_slider_item">
							<div
								className="home_slider_background"
								style={{ backgroundImage: `url(${homeSlider})` }}
							></div>
							<div className="home_slider_content_container">
								<div className="container">
									<div className="row">
										<div className="col">
											<div
												className="home_slider_content"
												data-animation-in="fadeIn"
												data-animation-out="animate-out fadeOut"
											>
												<div className="home_slider_title">
													Une nouvelle expérience de boutique en ligne.
												</div>
												<div className="home_slider_subtitle">
													ÉlectroMarket : L'essentiel de la technologie à portée
													de main. Explorez notre univers high-tech dès
													maintenant !
												</div>
												<div className="button button_light home_button">
													<a href="/">Explorer</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="home_slider_dots_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_slider_dots">
										<ul
											id="home_slider_custom_dots"
											className="home_slider_custom_dots"
										>
											<li className="home_slider_custom_dot active">01.</li>
											<li className="home_slider_custom_dot">02.</li>
											<li className="home_slider_custom_dot">03.</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="avds">
				<div className="avds_container d-flex flex-lg-row flex-column align-items-start justify-content-between">
					<div className="avds_small">
						<div
							className="avds_background"
							style={{ backgroundImage: `url(${photoAdvertisement})` }}
						></div>
						<div className="avds_small_inner">
							<div className="avds_discount_container">
								<img src={discount} alt="Remise fond" />
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
									professionnelle grâce à nos caméras haut de gamme. Donnez vie
									à vos histoires et exprimez votre créativité avec des images
									d'une netteté époustouflante.
								</div>
								<div className="avds_link avds_link_large">
									<a href="/">Explorer</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage;
