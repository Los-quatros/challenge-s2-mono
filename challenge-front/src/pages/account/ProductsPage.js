import { useEffect, useState } from 'react';

import defaultImage from '../../assets/images/categories/default.png';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { name } = useParams();

  /**
   * Add product to new products
   * @param { object } product Product object
   * @param { Blob } url Image url
   * @returns The product object
   */
  const addToNewProducts = (product, url) => {
    return {
      id: product.id ? product.id : null,
      image: {
        value: url ? url : defaultImage,
        error: '',
        name: product.image ? product.image.name : '',
        hasChanged: false,
      },
      label: {
        value: product.label ? product.label : '',
        error: '',
        hasChanged: false,
      },
      price: {
        value: product.price ? product.price : 1,
        error: '',
        hasChanged: false,
      },
      quantity: {
        value: product.quantity ? product.quantity : 1,
        error: '',
        hasChanged: false,
      },
      description: {
        value: product.description ? product.description : '',
        error: '',
        hasChanged: false,
      },
      category: {
        value: product.category.name ? product.category.name : '',
        error: '',
        hasChanged: false,
      },
    };
  };

  /**
   * Get all categories
   */
  const getCategories = () => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BASE_API_URL}/products/categories/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.length) {
          setCategories(data);
        }
      })
      .catch(() => {
        setToast(
          'Une erreur est survenue lors de la récupération des catégories',
          'error',
        );
      });
  };

  useEffect(() => {
    document
      .querySelector(`#account-menu`)
      .querySelectorAll('li')
      .forEach((li) => {
        if (li.id === `account-${name}`) {
          li.classList.add('active');
        } else {
          li.classList.remove('active');
        }
      });
  }, [name]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    fetch(
      `${process.env.REACT_APP_BASE_API_URL}/products/sellers/${decodedToken.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.length) {
          const token = localStorage.getItem('token');
          const newProducts = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].isActivated) {
              fetch(
                `${process.env.REACT_APP_BASE_API_URL}/images/${data[i].image.id}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
                .then((response) => {
                  if (response.status === 200) {
                    return response.blob();
                  }
                })
                .then((blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    data[i].image.value = url;
                    newProducts.push({ ...addToNewProducts(data[i], url) });
                  } else {
                    setToast(
                      "Une erreur est survenue lors de la récupération de l'image",
                      'info',
                    );
                    newProducts.push({ ...addToNewProducts(data[i], null) });
                  }
                  setProducts([...newProducts]);
                })
                .catch(() => {
                  setToast(
                    "Une erreur est survenue lors de la récupération de l'image",
                    'info',
                  );
                });
            }
          }
        }
      })
      .catch(() => {
        setToast(
          'Une erreur est survenue lors de la récupération des produits',
          'error',
        );
      });
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  /**
   * Add a new product
   */
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: null,
        image: {
          value: defaultImage,
          error: '',
          name: '',
          hasChanged: false,
        },
        label: {
          value: '',
          error: '',
          hasChanged: false,
        },
        price: {
          value: 1,
          error: '',
          hasChanged: false,
        },
        quantity: {
          value: 1,
          error: '',
          hasChanged: false,
        },
        description: {
          value: '',
          error: '',
          hasChanged: false,
        },
        category: {
          id: '',
          value: '',
          error: '',
          hasChanged: false,
        },
      },
    ]);
  };

  /**
   * Handle the upload of an image
   * @param { Event } image Image to upload
   * @param { number } index Index of the product in the list
   */
  const handleImageUpload = (image, index) => {
    const reader = new FileReader();
    const file = image;
    products[index].image.value = file;
    products[index].image.hasChanged = true;
    setProducts([...products]);
    reader.onload = (e) => {
      document.getElementById(`preview-${index}`).src = e.target.result;
      document.getElementById(`file-info-${index}`).placeholder = file.name;
    };
    reader.onerror = () => {
      setToast("Une erreur est survenue lors de l'upload de l'image", 'error');
      products[index].image.error =
        "Une erreur est survenue lors de l'upload de l'image";
    };
    reader.readAsDataURL(file);
  };

  /**
   * Handle the browse of an image
   * @param { number } index Index of the product in the list
   */
  const handleBrowse = (index) => {
    return document.querySelector(`#file-${index}`).click();
  };

  /**
   * Handle the change of an input in the form
   * @param { number } index Index of the product in the list
   * @param { string } field Field name
   * @param { string } value Field value
   */
  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field].value = value;
    updatedProducts[index][field].hasChanged = true;
    if (field === 'label') {
      if (value === '') {
        updatedProducts[index][field].error = 'Le nom est obligatoire';
      } else {
        if (value.length > 5) {
          updatedProducts[index][field].error = '';
        } else {
          updatedProducts[index][field].error =
            'Le nom doit contenir au moins 5 caractères';
        }
      }
    } else if (field === 'price') {
      if (value <= 0) {
        updatedProducts[index][field].error = 'Le prix doit être supérieur à 0';
      } else {
        updatedProducts[index][field].error = '';
      }
    } else if (field === 'quantity') {
      if (value <= 0) {
        updatedProducts[index][field].error =
          'La quantité doit être supérieure à 0';
      } else {
        updatedProducts[index][field].error = '';
      }
    } else if (field === 'description') {
      if (value === '') {
        updatedProducts[index][field].error = 'La description est obligatoire';
      } else {
        if (value.length > 10) {
          updatedProducts[index][field].error = '';
        } else {
          updatedProducts[index][field].error =
            'La description doit contenir au moins 10 caractères';
        }
      }
    } else if (field === 'category') {
      if (value === '') {
        updatedProducts[index][field].error = 'La catégorie est obligatoire';
      } else {
        updatedProducts[index][field].error = '';
        updatedProducts[index][field].id = categories.find(
          (category) => category.name === value,
        ).id;
      }
    }
    setProducts(updatedProducts);
  };

  /**
   * Set hasChanged to true or false for the specified product
   * @param { string } field Field name
   * @param { boolean } bool Boolean to set hasChanged to true or false
   */
  const setHasChanged = (field, bool) => {
    const updatedProducts = [...products];
    for (let i = 0; i < updatedProducts.length; i++) {
      updatedProducts[i][field].hasChanged = bool;
    }
    setProducts(updatedProducts);
  };

  /**
   * Delete an product from the list
   * @param { Event } event Event button on click
   * @param { number } index Index of the product to delete
   */
  const deleteProduct = (event, index) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (products[index].id === null) {
      removeProduct(event, index);
    } else {
      fetch(
        `${process.env.REACT_APP_BASE_API_URL}/products/${products[index].id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActivated: false,
          }),
        },
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            removeProduct(event, index);
          }
        })
        .catch(() => {
          setToast(
            'Une erreur est survenue lors de la suppression de le produit',
            'error',
          );
        });
    }
  };

  /**
   * Remove an product from the list
   * @param { Event } event Button event on click
   * @param { number } index Index of the product to remove
   */
  const removeProduct = (event, index) => {
    event.preventDefault();
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setToast('Produit supprimée', 'success');
  };

  /**
   * Convert a data url to a file
   * @param { string } dataUrl Data url
   * @param { string } filename File name
   * @returns { File } File converted
   */
  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  /**
   * Save the product in the database
   * @param { Event } event Event div on click
   * @param { number } index Index of the product in the list
   */
  const saveProduct = (event, index) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const label = products[index].label;
    const price = products[index].price;
    const quantity = products[index].quantity;
    const description = products[index].description;
    const category = products[index].category;
    const image = products[index].image.value;

    if (
      label.value === '' ||
      price.value === '' ||
      quantity.value === '' ||
      description.value === '' ||
      category.value === ''
    ) {
      setToast('Veuillez remplir tous les champs', 'info');
    } else {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label: label.value,
          description: description.value,
          price: Number(price.value),
          quantity: Number(quantity.value),
          category: category.id,
          idSeller: decodedToken.id,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            const formData = new FormData();
            // If the image is a dataURL, convert it to a file
            if (typeof image === 'string') {
              const file = dataURLtoFile(image, 'image.png');
              formData.append('file', file);
            } else {
              // Else, it's already a file
              formData.append('file', image);
            }
            fetch(
              `${process.env.REACT_APP_BASE_API_URL}/images/upload/product/${data.id}`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              },
            )
              .then((response) => {
                if (response.status === 201) {
                  return response.json();
                }
              })
              .then((data) => {
                if (data) {
                  setToast('Produit ajouté avec succès', 'success');
                  setHasChanged('label', false);
                  setHasChanged('description', false);
                  setHasChanged('price', false);
                  setHasChanged('quantity', false);
                  setHasChanged('category', false);
                  setHasChanged('image', false);
                }
              })
              .catch(() => {
                setToast(
                  "Une erreur est survenue lors du chargement de l'image",
                  'error',
                );
              });
          }
        })
        .catch(() => {
          setToast(
            "Une erreur est survenue lors de l'ajout du produit",
            'error',
          );
        });
    }
  };

  return (
    <div className="row">
      <div className="col-12 p-0">
        <div
          className="gap-3 d-md-flex text-center"
          style={{ marginBottom: '40px' }}
        >
          <button className="button products_button mt-0" onClick={addProduct}>
            <span>Ajouter un produit</span>
          </button>
        </div>
        <div className="row gx-5">
          {products.map((product, index) => (
            <div key={index} className="col-12 mb-3 mb-xxl-0">
              <div className="bg-secondary-soft rounded">
                <hr
                  className="hr hr-blurry"
                  style={{ marginTop: index === 0 ? '0px' : '16px' }}
                />
                <div className="row g-3">
                  <div className="col-12" id="image">
                    <label className="form-label">
                      Image<span className="red">*</span>
                    </label>
                    <div className="col-sm-6 pl-0">
                      <img
                        src={product.image.value}
                        id={`preview-${index}`}
                        height="100px"
                        width="100px"
                        className="img-thumbnail"
                        alt="Aperçu"
                      />
                    </div>
                    {!product.image.name && (
                      <input
                        type="file"
                        name={`file-${index}`}
                        id={`file-${index}`}
                        className="file"
                        style={{ visibility: 'hidden' }}
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(event.target.files[0], index)
                        }
                      />
                    )}
                    {!product.image.name && (
                      <div
                        className="input-group"
                        style={{ marginTop: '-20px' }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={product.image.name}
                          placeholder="Télécharger une image"
                          id={`file-info-${index}`}
                        />
                        <div
                          className="input-group-append"
                          onClick={() => handleBrowse(index)}
                        >
                          <button
                            type="button"
                            className="browse btn btn-secondary"
                          >
                            Parcourir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2" id="label">
                    <label htmlFor={`label-${index}`} className="form-label">
                      Nom
                      <span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom du produit"
                      id={`label-${index}`}
                      value={product.label.value}
                      onChange={(event) =>
                        handleChange(index, 'label', event.target.value)
                      }
                    />
                    {product.label.error !== '' && (
                      <div className="text-danger mt-2">
                        {product.label.error}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2" id="price">
                    <label htmlFor={`price-${index}`} className="form-label">
                      Prix
                      <span className="red">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Prix du produit"
                      id={`price-${index}`}
                      value={product.price.value}
                      onChange={(event) =>
                        handleChange(index, 'price', event.target.value)
                      }
                    />
                    {product.price.error !== '' && (
                      <div className="text-danger mt-2">
                        {product.price.error}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2" id="quantity">
                    <label htmlFor={`quantity-${index}`} className="form-label">
                      Quantité
                      <span className="red">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantité du produit"
                      id={`quantity-${index}`}
                      value={product.quantity.value}
                      onChange={(event) =>
                        handleChange(index, 'quantity', event.target.value)
                      }
                    />
                    {product.quantity.error !== '' && (
                      <div className="text-danger mt-2">
                        {product.quantity.error}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2" id="description">
                    <label
                      htmlFor={`description-${index}`}
                      className="form-label"
                    >
                      Description
                      <span className="red">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Description du produit"
                      id={`description-${index}`}
                      value={product.description.value}
                      onChange={(event) =>
                        handleChange(index, 'description', event.target.value)
                      }
                    ></textarea>
                    {product.description.error !== '' && (
                      <div className="text-danger mt-2">
                        {product.description.error}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2" id="category">
                    <label htmlFor={`category-${index}`} className="form-label">
                      Catégorie
                      <span className="red">*</span>
                    </label>
                    <select
                      className="form-control"
                      id={`category-${index}`}
                      value={product.category.value}
                      onChange={(event) =>
                        handleChange(index, 'category', event.target.value)
                      }
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <>
                        {categories.map((category, optionIndex) => (
                          <option key={optionIndex} value={category.name}>
                            {category.name === 'headphones' && 'Casque'}
                            {category.name === 'tablets' && 'Tablette'}
                            {category.name === 'phones' && 'Téléphone'}
                            {category.name === 'cameras' && 'Caméra'}
                          </option>
                        ))}
                      </>
                    </select>
                    {product.category.error !== '' && (
                      <div className="text-danger mt-2">
                        {product.category.error}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-2 d-flex">
                    <div className="gap-3 d-md-flex text-center mr-3">
                      <button
                        onClick={(event) => deleteProduct(event, index)}
                        className="button products_button"
                        style={{ height: '50px' }}
                      >
                        <span>Supprimer le produit</span>
                      </button>
                    </div>
                    {(product.category.hasChanged === true ||
                      product.description.hasChanged === true ||
                      product.label.hasChanged === true ||
                      product.image.hasChanged === true ||
                      product.price.hasChanged === true ||
                      product.quantity.hasChanged === true) && (
                      <div className="gap-3 d-md-flex text-center">
                        <button
                          className="button products_button"
                          onClick={(event) => saveProduct(event, index)}
                          style={{ height: '50px' }}
                        >
                          <span>Enregistrer le produit</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
