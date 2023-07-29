import { Link, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomeContainer from '../HomeContainerPage';
import imageCamerasBackground from '../../assets/images/categories/cameras/camera_1.png';
import imageHeadphonesBackground from '../../assets/images/categories/headphones/headphone_1.png';
import imagePhonesBackground from '../../assets/images/categories/phones/phone_1.png';
import imageTabletsBackground from '../../assets/images/categories/tablets/tablet_1.png';
import { toast } from 'react-toastify';

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

/**
 * Handle link click to prevent page reload
 * @param { Event } event Click event
 */
const handleLinkClick = (event) => event.preventDefault();

function ProductDetailsPage({ handleCartChange }) {
  const location = useLocation();
  const { product } = location.state;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const categories = ['headphones', 'tablets', 'phones', 'cameras'];
  const [role, setRole] = useState('user');
  const [quantityError, setQuantityError] = useState('');

  useEffect(() => {
    if (product.category.name === 'headphones') {
      setTitle('Nos casques');
    } else if (product.category.name === 'tablets') {
      setTitle('Nos tablettes');
    } else if (product.category.name === 'phones') {
      setTitle('Nos téléphones');
    } else {
      setTitle('Nos caméras');
    }
  }, [product.category.name]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
  }, []);

  useEffect(() => {
    if (product.category.name === 'headphones') {
      setContent(`Plongez au cœur d'une expérience sonore immersive et
      exceptionnelle avec nos casques de musique haut de gamme. Que vous soyez un audiophile
      passionné ou que vous cherchiez simplement à profiter pleinement de votre
      musique préférée, nos casques vous offriront une qualité audio inégalée.`);
    } else if (product.category.name === 'tablets') {
      setContent(`Découvrez notre sélection de tablettes haut de gamme qui
      vous offriront une expérience technologique exceptionnelle. Que vous soyez un amateur de
      divertissement, un étudiant ou un professionnel en déplacement, nos tablettes sont conçues pour répondre à
      tous vos besoins.`);
    } else if (product.category.name === 'phones') {
      setContent(`Découvrez notre téléphone révolutionnaire, alliant style
      et fonctionnalités avancées ! Son design élégant et ergonomique captivera votre regard dès le premier
      instant. Plongez dans une expérience immersive grâce à son écran haute résolution, offrant des couleurs vives
      et un contraste saisissant. Vous ne pourrez plus détacher vos yeux de ce spectacle visuel captivant.`);
    } else {
      setContent(`Découvrez la puissance de la capture avec nos caméras de pointe.
      Offrant une qualité  d'image exceptionnelle et des fonctionnalités avancées,
      elles sont conçues pour répondre aux besoins des photographes et des vidéastes les plus exigeants.
      Faites un pas vers l'excellence photographique avec nos caméras de haute précision.`);
    }
  }, [product.category.name]);

  useEffect(() => {
    if (product.category.name === 'headphones') {
      setImage(imageHeadphonesBackground);
    } else if (product.category.name === 'tablets') {
      setImage(imageTabletsBackground);
    } else if (product.category.name === 'phones') {
      setImage(imagePhonesBackground);
    } else {
      setImage(imageCamerasBackground);
    }
  }, [product.category.name]);

  /**
   * Triggered when the quantity input value changes
   * @param { Event } event Input event
   * @param { Object } product Product to add to the cart
   */
  const onQuantityChange = (event, product) => {
    const value = event.target.value;
    if (value < 1) {
      setQuantity(1);
      setQuantityError('');
    } else if (value >= product.quantity) {
      setQuantity(product.quantity);
      setQuantityError(
        `La quantité maximale de ce produit est de ${product.quantity}`,
      );
    } else {
      setQuantity(Number(value));
      setQuantityError('');
    }
  };

  /**
   * Increase the quantity by 1
   * @param { Object } product Product to add to the cart
   */
  const increaseQuantity = (product) => {
    if (quantity >= product.quantity) {
      setQuantity(product.quantity);
      setQuantityError(
        `La quantité maximale de ce produit est de ${product.quantity}`,
      );
    } else {
      setQuantity(quantity + 1);
      setQuantityError('');
    }
  };

  /**
   * Decrease the quantity by 1
   */
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityError('');
    } else {
      setQuantity(1);
      setQuantityError('');
    }
  };

  /**
   * Handle the add to cart button click
   * - Emit event to update the cart
   */
  const handleAddToCart = () => handleCartChange();

  /**
   * Add the product to the cart
   * @param { Event } event Click event
   * @param { Object } product Product to add to the cart
   */
  const addProductToCart = (event, product) => {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartProduct = { ...product };
    delete cartProduct.description;
    if (cart) {
      const existingProduct = cart.find(
        (item) =>
          item.id === product.id && item.category === product.category.name,
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.setItem('cart', JSON.stringify([{ ...product, quantity }]));
    }
    setToast('Produit ajouté au panier', 'success');
    setQuantity(1);
    handleAddToCart();
  };

  if (!categories.includes(product.category.name)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="home">
        <HomeContainer image={image} title={title} content={content} />
      </div>
      <div className="product_details">
        <div className="container">
          <div className="row details_row">
            <div className="col-lg-6">
              <div className="details_image">
                <div className="details_image_large">
                  <img src={product.image} alt={product.label} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="details_content">
                <div className="details_name">{product.label}</div>
                <div className="details_price">{product.price}€</div>
                <div className="details_text">
                  <p>{product.description}</p>
                </div>
                {(!role || (role && role !== 'seller')) && (
                  <>
                    <div className="product_quantity_container">
                      <div className="product_quantity clearfix">
                        <input
                          id="quantity_input"
                          type="text"
                          onInput={(event) => onQuantityChange(event, product)}
                          value={quantity}
                        />
                        <div className="quantity_buttons">
                          <div
                            id="quantity_inc_button"
                            className="quantity_inc quantity_control"
                            onClick={() => increaseQuantity(product)}
                          >
                            <i
                              className="fa fa-chevron-up"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div
                            id="quantity_dec_button"
                            className="quantity_dec quantity_control"
                            onClick={decreaseQuantity}
                          >
                            <i
                              className="fa fa-chevron-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="button cart_button">
                        {product.quantity > 0 ? (
                          <Link
                            onClick={(event) =>
                              addProductToCart(event, product)
                            }
                          >
                            Ajouter
                          </Link>
                        ) : (
                          <Link onClick={(event) => event.preventDefault()}>
                            Épuisé
                          </Link>
                        )}
                      </div>
                    </div>
                    {quantityError !== '' && (
                      <p className="text-danger" style={{ marginTop: '10px' }}>
                        {quantityError}
                      </p>
                    )}
                  </>
                )}
                <div
                  className="details_share"
                  style={quantityError !== '' ? { marginTop: '41px' } : {}}
                >
                  <ul>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
