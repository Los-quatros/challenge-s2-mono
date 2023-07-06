import React, { useState } from "react";
import "../../../assets/styles/admin/popup.css";

const CategoryPopup = ({ category, onClose, onSave }) => {
  const [name, setLabel] = useState(category.name);

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const handleSave = () => {
    const updatedCategory = {
      id: category?.id,
      name,
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
                value={name}
                onChange={handleLabelChange}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
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
