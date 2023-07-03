import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";

const ClientPreviewAll = () => {
  return (
    <div className="col-lg-6">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Tous les clients </h4>
          <a href="">Voir plus</a>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td className="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td className="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td>YacineCDC@gmail.com</td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td className="color-primary">$21.56</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPreviewAll;
