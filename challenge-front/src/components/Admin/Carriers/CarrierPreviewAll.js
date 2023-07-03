import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";

const CarrierPreviewAll = () => {
  return (
    <div class="col-lg-6">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Toutes les transporteurs </h4>
          <a href="">Voir plus</a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td class="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td class="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td class="color-primary">$21.56</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierPreviewAll;
