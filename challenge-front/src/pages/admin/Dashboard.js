import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import styles from "../../assets/styles/admin/style.module.css";
import sidebar from "../../assets/styles/admin/sidebar.module.css";
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
                <div className="col-lg-3">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>Total Profit</div>
                        <div className={styles["stat-digit"]}>1,012</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>New Customer</div>
                        <div className={styles["stat-digit"]}>961</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>New Customer</div>
                        <div className={styles["stat-digit"]}>961</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={styles.card}>
                    <div className={styles["stat-widget-one"]}>
                      <div className={styles["stat-icon"] + styles.dib}>
                        <i className={styles["ti-money"]}></i>
                      </div>
                      <div className={styles["stat-content dib"]}>
                        <div className={styles["stat-text"]}>New Customer</div>
                        <div className={styles["stat-digit"]}>961</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLES */}
              <div className={styles.row + " row"}>
                <div class="col-lg-6">
                  <div className={styles.card + " card"}>
                    <div
                      className={
                        styles["card-title"] + " " + styles.pr + " card-title"
                      }
                    >
                      <h4>Toutes les produits </h4>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th></th>
                              <th>Nom</th>
                              <th>Description</th>
                              <th>Prix</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>

                              <td>
                                <img
                                  src="https://via.placeholder.com/50x50"
                                  alt=""
                                />
                              </td>
                              <td>Kolor Tea Shirt For Man</td>
                              <td>January 22</td>
                              <td class="color-primary">$21.56</td>
                            </tr>
                            <tr>
                              <th scope="row">1</th>

                              <td>
                                <img
                                  src="https://via.placeholder.com/50x50"
                                  alt=""
                                />
                              </td>
                              <td>Kolor Tea Shirt For Man</td>
                              <td>January 22</td>
                              <td class="color-primary">$21.56</td>
                            </tr>
                            <tr>
                              <th scope="row">1</th>

                              <td>
                                <img
                                  src="https://via.placeholder.com/50x50"
                                  alt=""
                                />
                              </td>
                              <td>Kolor Tea Shirt For Man</td>
                              <td>January 22</td>
                              <td class="color-primary">$21.56</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div className={styles.card + " card"}>
                    <div
                      className={
                        styles["card-title"] + " " + styles.pr + " card-title"
                      }
                    >
                      <h4>Toutes les commandes </h4>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Kolor Tea Shirt For Man</td>
                              <td>
                                <span class="badge badge-primary">Sale</span>
                              </td>
                              <td>January 22</td>
                              <td class="color-primary">$21.56</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Kolor Tea Shirt For Women</td>
                              <td>
                                <span class="badge badge-success">Tax</span>
                              </td>
                              <td>January 30</td>
                              <td class="color-success">$55.32</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>Blue Backpack For Baby</td>
                              <td>
                                <span class="badge badge-danger">Extended</span>
                              </td>
                              <td>January 25</td>
                              <td class="color-danger">$14.85</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
