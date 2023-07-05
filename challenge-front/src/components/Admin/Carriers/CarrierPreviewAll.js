import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import CarrierPopup from "./CarrierPopup";
import useCarrier from "../../../hooks/Admin/useCarrier";
import { toast } from "react-toastify";

const CarrierPreviewAll = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  const openPopup = (carrier) => {
    setSelectedCarrier(carrier);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedCarrier(null);
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

  const { carriers, isLoading, saveCarrier, deleteCarrier } = useCarrier();

  const handleSave = async (carrier) => {
    try {
      await saveCarrier(carrier);
      closePopup();
      setToast("Transporteur enregistré avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de l'enregistrement du transporteur", "error");
    }
  };

  const handleDelete = async (carrierId) => {
    try {
      await deleteCarrier(carrierId);
      closePopup();
      setToast("Transporteur supprimé avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de la suppression du transporteur", "error");
    }
  };

  return (
    <div className="col-lg-4">
      <div className={styles.card + " card"} style={{ height: "500px" }}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Tous les transporteurs </h4>
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
                    <th>Nom</th>
                    <th>Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {carriers &&
                    carriers.map((carrier) => (
                      <tr key={carrier.id}>
                        <td>{carrier.name}</td>
                        <td>{carrier.fees}</td>
                        <td>
                          <span className="m-l-10">
                            <i
                              className="fa fa-pencil-square-o pr-2"
                              aria-hidden="true"
                              style={{
                                color: "blue",
                                cursor: "pointer",
                              }}
                              onClick={() => openPopup(carrier)}
                            ></i>
                            <i
                              className="fa fa-trash pr-2"
                              aria-hidden="true"
                              style={{
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDelete(carrier.id)}
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
        <CarrierPopup
          carrier={selectedCarrier}
          onClose={closePopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CarrierPreviewAll;
