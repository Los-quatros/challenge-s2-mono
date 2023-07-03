import React, { useState } from "react";
import "../../../assets/styles/admin/popup.client.css";

const ClientPopup = ({ user, onClose, onSave }) => {
  const [email, setEmail] = useState(user.email);
  const [lastName, setLastName] = useState(user.lastName);
  const [firstName, setFirstName] = useState(user.firstName);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleSave = () => {
    const updatedClient = {
      id: user?.id,
      email,
      lastName,
      firstName,
    };

    onSave(updatedClient);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>{user.id ? "Modifier Utilisateur" : "Ajouter Utilisateur"}</h2>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={handleFirstNameChange}
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

export default ClientPopup;
