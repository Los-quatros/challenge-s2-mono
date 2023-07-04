import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
const ProductPreviewAll = () => {
  return (
    <div className="col-lg-8">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Tous les produits </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                  </td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td>January 22</td>
                  <td className="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                  </td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td>January 22</td>
                  <td className="color-primary">$21.56</td>
                </tr>
                <tr>
                  <td>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                  </td>
                  <td>Kolor Tea Shirt For Man</td>
                  <td>January 22</td>
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

export default ProductPreviewAll;
