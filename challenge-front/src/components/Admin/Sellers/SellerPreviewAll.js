import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
const SellerPreviewAll = () => {
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
          <h4>Tous les vendeurs </h4>
          <a href="">Voir plus</a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Boutique</th>
                  <th className="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>SOUSSI</td>
                  <td> Yacine </td>
                  <td>Markeplace</td>
                  <td className="text-left">Je suis une boutique</td>
                </tr>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>SOUSSI</td>
                  <td>$21.56</td>
                </tr>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>SOUSSI</td>
                  <td>$21.56</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPreviewAll;
