import React, { useState } from "react";
import "../../../assets/styles/admin/popup.css";

const CarrierPopup = ({ carrier, onClose, onSave }) => {
  const [name, setName] = useState(carrier.name);
  const [fees, setFees] = useState(carrier.fees);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFeesChange = (e) => {
    setFees(e.target.value);
  };

  const handleSave = () => {
    const updatedCarrier = {
      id: carrier?.id,
      name,
      fees,
    };
    onSave(updatedCarrier);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>
            {carrier.id ? "Modifier Transporteur" : "Ajouter Transporteur"}
          </h2>
          <form>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label>Frais</label>
              <input
                type="text"
                className="form-control"
                value={fees}
                onChange={handleFeesChange}
              />
            </div>
            <div className="popup-buttons">
              <button className="btn btn-primary m-2" onClick={handleSave}>
                {carrier.id ? "Enregistrer" : "Ajouter"}
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Fermer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CarrierPopup;
