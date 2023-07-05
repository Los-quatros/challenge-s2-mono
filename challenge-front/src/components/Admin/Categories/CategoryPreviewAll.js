import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useCategory from "../../../hooks/Admin/useCategory";
import CategoryPopup from "./CategoryPopup";
import { toast } from "react-toastify";

const CategoryPreviewAll = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openPopup = (category) => {
    setSelectedCategory(category);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedCategory(null);
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

  const { categories, isLoading, saveCategory, deleteCategory } = useCategory();

  const handleSave = async (category) => {
    try {
      await saveCategory(category);
      closePopup();
      setToast("Catégorie enregistrée avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de l'enregistrement de la catégorie", "error");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      closePopup();
      setToast("Catégorie supprimée avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de la suppression de la catégorie", "error");
    }
  };

  return (
    <div className="col-lg-6">
      <div className={styles.card + " card"} style={{ height: "500px" }}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Liste des catégories</h4>
          <button className="btn btn-dark" onClick={() => openPopup(null)}>
            Ajouter
          </button>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories !== undefined ||
                    (null &&
                      categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.name}</td>
                          <td>
                            <i
                              className="fas fa-edit text-primary"
                              onClick={() => openPopup(category)}
                            />
                            <i
                              className="fas fa-trash-alt text-danger ml-2"
                              onClick={() => handleDelete(category.id)}
                            />
                          </td>
                        </tr>
                      )))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <CategoryPopup
          category={selectedCategory}
          closePopup={closePopup}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default CategoryPreviewAll;
