import React, { useState } from "react";
import "../../../assets/styles/admin/popup.css";

const CategoryPopup = ({ category, onClose, onSave }) => {
  const [label, setLabel] = useState(category.label);

  const [errors, setErrors] = useState({
    label: "",
  });

  const validateForm = () => {
    let newErrors = {};

    if (label === "" || !label) {
      newErrors.label = "Veuillez saisir un label.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, label: "" }));
  };

  const handleSave = () => {
    const updatedCategory = {
      id: category?.id,
      label,
    };

    onSave(updatedCategory);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>{category.id ? "Modifier Catégorie" : "Ajouter Catégorie"}</h2>
          <form>
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                className="form-control"
                value={label}
                onChange={handleLabelChange}
              />
              {errors.label && (
                <div className="error-message">{errors.label}</div>
              )}
            </div>
            <div className="popup-buttons">
              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={handleSave}
              >
                {category.id ? "Enregistrer" : "Ajouter"}
              </button>
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={onClose}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
