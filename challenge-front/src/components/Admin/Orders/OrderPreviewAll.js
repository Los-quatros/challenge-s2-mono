import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
const OrderPreviewAll = () => {
  return (
    <div class="col-lg-6">
      <div className={styles.card + " card"}>
        <div className={styles["card-title"] + " " + styles.pr + " card-title"}>
          <h4>Toutes les commandes </h4>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kolor Tea Shirt For Man</td>
                  <td>
                    <span class="badge badge-primary">Sale</span>
                  </td>
                  <td>January 22</td>
                  <td>2</td>
                  <td class="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td>Kolor Tea Shirt For Women</td>
                  <td>
                    <span class="badge badge-success">Tax</span>
                  </td>
                  <td>January 30</td>
                  <td>1</td>
                  <td class="color-success">$55.32</td>
                </tr>
                <tr>
                  <td>Blue Backpack For Baby</td>
                  <td>
                    <span class="badge badge-danger">Extended</span>
                  </td>
                  <td>January 25</td>
                  <td>1</td>
                  <td class="color-danger">$14.85</td>
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
