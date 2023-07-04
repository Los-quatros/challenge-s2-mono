import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useProduct from "../../../hooks/Admin/useProduct";
const ProductPreviewAll = () => {
  const {
    products,
    isLoading,
    saveProducts,
    deleteProducts,
    activateProduct,
    desactivateProduct,
  } = useProduct();
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
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src="https://via.placeholder.com/50x50"
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{product.label}</td>
                        <td>{product.description.slice(0, 10)}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price } €</td>
                        <td>
                          {product.isActivated ? (
                            <i
                              className="fa fa-unlock"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => desactivateProduct(product.id)}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-lock"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => activateProduct(product.id)}
                            ></i>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewAll;
