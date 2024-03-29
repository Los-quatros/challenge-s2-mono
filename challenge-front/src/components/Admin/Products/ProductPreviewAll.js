import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useProduct from "../../../hooks/Admin/useProduct";
import ProductPopup from "./ProductPopup";
import { toast } from "react-toastify";

const ProductPreviewAll = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsPopupOpen(false);
  };

  const setToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const {
    products,
    isLoading,
    saveProduct,
    activateProduct,
    desactivateProduct,
  } = useProduct();

  const handleSave = async (product) => {
    try {
      await saveProduct(product);
      closePopup();
      setToast("Produit enregistré avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de l'enregistrement du produit", "error");
    }
  };

  return (
    <div className="col-lg-12">
      <div className={styles.card + " card"} style={{ height: "500px" }}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Liste des produits </h4>

          <button
            className="btn btn-dark"
            onClick={() => openPopup({})}
            style={{ width: "150px" }}
          >
            Ajouter
          </button>
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
          <div className="card-body" style={{ overflow: "scroll" }}>
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
                        <td>
                          {product.description.slice(0, 50)}{" "}
                          {product.description.length > 50 && "..."}
                        </td>
                        <td>{product.quantity}</td>
                        <td>{product.price} €</td>
                        <td>
                          {product.isActivated ? (
                            <i
                              className="fa fa-unlock"
                              style={{ color: "black", cursor: "pointer" }}
                              onClick={() => desactivateProduct(product.id)}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-lock"
                              style={{ color: "black", cursor: "pointer" }}
                              onClick={() => activateProduct(product.id)}
                            ></i>
                          )}
                          <i
                            className="fa fa-pencil-square-o pl-2"
                            aria-hidden="true"
                            style={{
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => openPopup(product)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <ProductPopup
          product={selectedProduct}
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default ProductPreviewAll;
