import React, { useState } from "react";
import "../../../assets/styles/admin/popup.css";

const SellerPopup = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    const updatedSeller = {
      id: user?.id,
      name,
      description,
    };

    onSave(updatedSeller);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>{user.id ? "Modifier Utilisateur" : "Ajouter Utilisateur"}</h2>
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
              <label>Description</label>
              <textarea
                rows="4"
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div className="popup-buttons">
              <button className="btn btn-primary m-2" onClick={handleSave}>
                {user.id ? "Enregistrer" : "Ajouter"}
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

export default SellerPopup;
