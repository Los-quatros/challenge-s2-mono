import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import styles from "../../assets/styles/admin/style.module.css";
import sidebar from "../../assets/styles/admin/sidebar.module.css";
import ProductPreviewAll from "../../components/Admin/Products/ProductPreviewAll";
import OrderPreviewAll from "../../components/Admin/Orders/OrderPreviewAll";
import ReturnPreviewAll from "../../components/Admin/Returns/ReturnPreviewAll";
import CarrierPreviewAll from "../../components/Admin/Carriers/CarrierPreviewAll";
const Dashboard = () => {
  return (
    <>
      <Sidebar />

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
                        <div className={styles["stat-digit"]}>1,012</div>
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
                        <div className={styles["stat-digit"]}>961</div>
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
                        <div className={styles["stat-digit"]}>961</div>
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
                        <div className={styles["stat-digit"]}>961</div>
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
                        <div className={styles["stat-digit"]}>961</div>
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
                        <div className={styles["stat-digit"]}>961</div>
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
