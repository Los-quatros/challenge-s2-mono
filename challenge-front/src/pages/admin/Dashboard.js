import React from "react";
import styles from "../../assets/styles/admin/style.module.css";
import sidebar from "../../assets/styles/admin/sidebar.module.css";
import ProductPreviewAll from "../../components/Admin/Products/ProductPreviewAll";
import OrderPreviewAll from "../../components/Admin/Orders/OrderPreviewAll";
import ReturnPreviewAll from "../../components/Admin/Returns/ReturnPreviewAll";
import CarrierPreviewAll from "../../components/Admin/Carriers/CarrierPreviewAll";
import ClientPreviewAll from "../../components/Admin/Clients/ClientPreviewAll";
import SellerPreviewAll from "../../components/Admin/Sellers/SellerPreviewAll";
import CategoryPreviewAll from "../../components/Admin/Categories/CategoryPreviewAll";
import useClient from "../../hooks/Admin/useClient";
import useSeller from "../../hooks/Admin/useSeller";
import useCarrier from "../../hooks/Admin/useCarrier";
import useProduct from "../../hooks/Admin/useProduct";
import useOrder from "../../hooks/Admin/useOrder";
import useReturn from "../../hooks/Admin/useReturn";
const Dashboard = () => {
  const { users } = useClient();
  const { sellers } = useSeller();
  const { carriers } = useCarrier();
  const { products } = useProduct();
  const { orders } = useOrder();
  const { returns } = useReturn();

  return (
    <>
      {/* header for logout */}
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

      <div className={sidebar["content-wrap"]}>
        <div className={styles.main}>
          <div className="container-fluid">
            <section id="main-content mt-2">
              {/* STATS */}
              <div className={styles.row + " row"}>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>
                          Total Produits
                        </div>
                        <div className={styles["stat-digit"]}>
                          {products ? products.length : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>Total clients</div>
                        <div className={styles["stat-digit"]}>
                          {users ? users.length : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>
                          Total vendeurs
                        </div>
                        <div className={styles["stat-digit"]}>
                          {sellers && sellers.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>
                          Total commandes
                        </div>
                        <div className={styles["stat-digit"]}>
                          {orders ? orders.length : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>
                          Total transporteurs
                        </div>
                        <div className={styles["stat-digit"]}>
                          {carriers && carriers.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>Total retours</div>
                        <div className={styles["stat-digit"]}>
                          {returns ? returns.length : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLES */}
              <div className={styles.row + " row"}>
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
