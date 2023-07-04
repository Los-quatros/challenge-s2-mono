import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import CarrierPopup from "./CarrierPopup";
import useCarrier from "../../../hooks/Admin/useCarrier";

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

  const { carriers, isLoading, saveCarrier, deleteCarrier } = useCarrier();

  const handleSave = async (carrier) => {
    try {
      await saveCarrier(carrier);
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-lg-4">
      <div className={styles.card + " card"}>
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
        <div className="card-body">
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
                            onClick={() => deleteCarrier(carrier.id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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
