import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useSeller from "../../../hooks/Admin/useSeller";
import SellerPopup from "./SellerPopup";
import { toast } from "react-toastify";

const SellerPreviewAll = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openPopup = (seller) => {
    setSelectedUser(seller);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  const setToast = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };

  const {
    sellers,
    isLoading,
    saveSeller,
    deleteSeller,
    activeSeller,
    desactiveSeller,
  } = useSeller();

  const handleSave = async (seller) => {
    try {
      await saveSeller(seller);
      closePopup();
    } catch (error) {
      setToast("error", "Erreur lors de l'enregistrement du vendeur");
    }
  };

  const handleActive = async (sellerId) => {
    try {
      await activeSeller(sellerId);
    } catch (error) {
      setToast("error", "Erreur lors de l'activation du vendeur");
    }
  };

  const handleDesactive = async (sellerId) => {
    try {
      await desactiveSeller(sellerId);
    } catch (error) {
      setToast("error", "Erreur lors de la désactivation du vendeur");
    }
  };

  return (
    <div className="col-lg-6">
      <div
        className={styles.card + " card pr-2"}
        style={{ height: "500px", overflow: "scroll" }}
      >
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Liste des vendeurs </h4>
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
                    <th>Boutique</th>
                    <th className="text-left">Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers &&
                    sellers.map((seller) => (
                      <tr key={seller.id}>
                        <td>{seller.name}</td>
                        <td className="text-left">{seller.description}</td>
                        <td>
                          <div
                            className={`
                          ${styles["badge"]}
                          ${
                            seller.isActive
                              ? styles["badge-success"] + " badge-success"
                              : styles["badge-danger"] + " badge-danger"
                          }
                           `}
                          >
                            {seller.isActive === true ? "Actif" : "Inactif"}
                          </div>
                        </td>
                        <td>
                          <span className="m-l-10">
                            {seller.isActive === true ? (
                              <i
                                className="fa fa-times pr-2"
                                aria-hidden="true"
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  marginLeft: 5,
                                }}
                                onClick={() => handleDesactive(seller.id)}
                              ></i>
                            ) : (
                              <i
                                className="fa fa-check pr-2"
                                aria-hidden="true"
                                style={{
                                  color: "green",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleActive(seller.id)}
                              ></i>
                            )}

                            <i
                              className="fa fa-pencil-square-o pr-2"
                              aria-hidden="true"
                              style={{
                                color: "blue",
                                cursor: "pointer",
                              }}
                              onClick={() => openPopup(seller)}
                            ></i>
                            <i
                              className="fa fa-trash-o"
                              aria-hidden="true"
                              style={{
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteSeller(seller.id)}
                            ></i>
                          </span>
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
        <SellerPopup
          user={selectedUser}
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default SellerPreviewAll;
