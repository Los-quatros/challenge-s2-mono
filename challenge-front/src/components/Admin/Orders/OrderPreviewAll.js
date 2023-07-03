import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
const OrderPreviewAll = () => {
  return (
    <div class="col-lg-6">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between pb-1"
          }
        >
          <h4>Toutes les commandes </h4>
          <a href="">Voir plus</a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Référence</th>
                  <th>État</th>
                  <th>Date</th>
                  <th>Produits</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kolor Tea Shirt For Man</td>
                  <td>
                    <span class="badge badge-primary">En cours</span>
                  </td>
                  <td>January 22</td>
                  <td>2</td>
                  <td class="color-primary">$21.56</td>
                  <td>
                    <span className="m-l-10">
                      <i
                        className="fa fa-check-square pr-2"
                        aria-hidden="true"
                        style={{
                          color: "gray",
                          cursor: "pointer",
                        }}
                      ></i>
                      <i
                        className="fa fa-check-square pr-2"
                        aria-hidden="true"
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Kolor Tea Shirt For Women</td>
                  <td>
                    <span class="badge badge-success">Livré</span>
                  </td>
                  <td>January 30</td>
                  <td>1</td>
                  <td class="color-success">$55.32</td>
                  <td>
                    <span className="m-l-10">
                      <i
                        className="fa fa-check-square pr-2"
                        aria-hidden="true"
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Blue Backpack For Baby</td>
                  <td>
                    <span class="badge badge-danger p-1">Extended</span>
                  </td>
                  <td>January 25</td>
                  <td>1</td>
                  <td class="color-danger">$14.85</td>
                  <td>
                    <span className="m-l-10">
                      <i
                        className="fa fa-check-square pr-2"
                        aria-hidden="true"
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreviewAll;
