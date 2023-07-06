import CarrierPreviewAll from "../../components/Admin/Carriers/CarrierPreviewAll";
import CategoryPreviewAll from "../../components/Admin/Categories/CategoryPreviewAll";
import ClientPreviewAll from "../../components/Admin/Clients/ClientPreviewAll";
import OrderPreviewAll from "../../components/Admin/Orders/OrderPreviewAll";
import ProductPreviewAll from "../../components/Admin/Products/ProductPreviewAll";
import React from "react";
import ReturnPreviewAll from "../../components/Admin/Returns/ReturnPreviewAll";
import SellerPreviewAll from "../../components/Admin/Sellers/SellerPreviewAll";
import useCarrier from "../../hooks/Admin/useCarrier";
import useClient from "../../hooks/Admin/useClient";
import useOrder from "../../hooks/Admin/useOrder";
import useProduct from "../../hooks/Admin/useProduct";
import useReturn from "../../hooks/Admin/useReturn";
import useSeller from "../../hooks/Admin/useSeller";

const Dashboard = () => {
	const { users } = useClient();
	const { sellers } = useSeller();
	const { carriers } = useCarrier();
	const { products } = useProduct();
	const { orders } = useOrder();
	const { returns } = useReturn();

	return (
		<>
			<header
				className="d-flex p-2 justify-content-end"
				style={{ backgroundColor: "#fff" }}
			>
				<button
					className="btn btn-dark"
					onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("role");
						window.location = "/";
					}}
				>
					<i className="fa fa-sign-out"></i> Deconnexion
				</button>
			</header>
			<div className="content-wrap">
				<div className="main">
					<div className="container-fluid">
						<section id="main-content mt-2">
							{/* STATS */}
							<div className="row">
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total Produits</div>
												<div className="stat-digit">
													{products ? products.length : 0}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total clients</div>
												<div className="stat-digit">
													{users ? users.length : 0}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total vendeurs</div>
												<div className="stat-digit">
													{sellers && sellers.length}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total commandes</div>
												<div className="stat-digit">
													{orders ? orders.length : 0}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total transporteurs</div>
												<div className="stat-digit">
													{carriers && carriers.length}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="card">
										<div className="stat-widget-one">
											<div className="stat-content dib">
												<div className="stat-text">Total retours</div>
												<div className="stat-digit">
													{returns ? returns.length : 0}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* TABLES */}
							<div className="row">
								<OrderPreviewAll />
								<ReturnPreviewAll />
								<ProductPreviewAll />
								<ClientPreviewAll />
								<SellerPreviewAll />
								<CategoryPreviewAll />
								<CarrierPreviewAll />
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
