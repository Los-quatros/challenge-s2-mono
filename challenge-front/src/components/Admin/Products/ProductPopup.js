import '../../../assets/styles/admin/popup.css';

import React, { useState } from 'react';

const ProductPopup = ({ product, onClose, onSave, categories }) => {
  const [label, setLabel] = useState(product.label);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  // const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category);

  const [errors, setErrors] = useState({
    label: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
    category: '',
  });

  const validateForm = () => {
    let newErrors = {};

    if (label === '' || !label) {
      newErrors.label = 'Veuillez saisir un label.';
    }

    if (description === '' || !description) {
      newErrors.description = 'Veuillez saisir une description.';
    }

    if (price === '' || !price) {
      newErrors.price = 'Veuillez saisir un prix.';
    } else if (isNaN(price)) {
      newErrors.price = 'Le prix doit être un nombre.';
    }

    if (quantity === '' || !quantity) {
      newErrors.quantity = 'Veuillez saisir une quantité.';
    } else if (isNaN(quantity)) {
      newErrors.quantity = 'La quantité doit être un nombre.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, label: '' }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, price: '' }));
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, quantity: '' }));
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.value);
  //   setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
  // };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, category: '' }));
  };

  const handleSave = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const updatedProduct = {
      id: product?.id,
      label,
      description,
      price,
      quantity: parseInt(quantity),
      // image,
      category,
    };
    onSave(updatedProduct);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>{product.id ? 'Modifier Produit' : 'Ajouter Produit'}</h2>
          <form>
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                className="form-control"
                value={label}
                onChange={handleLabelChange}
              />
              {errors.label && <p className="error-message">{errors.label}</p>}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                className="form-control"
                rows="3"
                value={description}
                onChange={handleDescriptionChange}
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>
            <div className="form-group">
              <label>Prix</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={handlePriceChange}
              />
              {errors.price && <p className="error-message">{errors.price}</p>}
            </div>
            <div className="form-group">
              <label>Quantité</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {errors.quantity && (
                <p className="error-message">{errors.quantity}</p>
              )}
            </div>
            {/* <label>Image</label>
            <input
              type="file"
              className="form-control"
              value={image}
              onChange={handleImageChange}
            /> */}
            {/* {errors.image && <p className="error-message">{errors.image}</p>} */}
            <div className="form-group">
              <label>Catégorie</label>
              <select
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
              >
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </div>
          </form>
          <div className="popup-buttons">
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={handleSave}
            >
              Enregistrer
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
