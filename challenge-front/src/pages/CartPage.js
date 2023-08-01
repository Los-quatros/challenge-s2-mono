import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import cartPageBackground from '../assets/images/cart/cart.png';
import jwt_decode from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

function CartPage({ handleClearCart }) {
  const [products, setProducts] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('-');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [carriers, setCarriers] = useState([]);
  const [addresses, setAddresses] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role && role !== 'user') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (products.length > 0) {
      let newSubtotal = 0;
      let newTotal = 0;

      products.forEach((p) => {
        newSubtotal += Number(p.price) * Number(p.quantity);
        newTotal += p.price * p.quantity;
      });

      const carrier = carriers.find((a) => a.name === deliveryMode);

      if (carrier) {
        newTotal += carrier.fees;
      }

      setSubtotal(newSubtotal);
      setTotal(newTotal);
    }
  }, [products, deliveryMode, carriers, isLogged, products.length]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setProducts(cart);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (isLogged && products.length > 0) {
      const token = localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_BASE_API_URL}/carriers`, {
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
          if (data) {
            setCarriers(data);
            setDeliveryMode(data[0].name);
          }
        })
        .catch(() => {
          setToast('Erreur lors du chargement des transporteurs', 'error');
        });
    }
  }, [isLogged, products]);

  useEffect(() => {
    if (isLogged && products.length > 0) {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      fetch(
        `${process.env.REACT_APP_BASE_API_URL}/addresses/users/${decodedToken.id}`,
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
          if (data) {
            setAddresses(data);
            setSelectedAddress(data[0].id);
          }
        })
        .catch(() => {
          setToast('Erreur lors du chargement des adresses', 'error');
        });
    }
  }, [isLogged, products]);

  /**
   * Handle checkout button click for payment
   * @param { Event } event Event button click
   */
  const handlePayment = async (event) => {
    event.preventDefault();
    if (isLogged && addresses.length > 0) {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const data = {
        orderProducts: products.map((p) => ({
          id_product: p.id,
          quantity: p.quantity,
        })),
        total: total,
        carrier: carriers.find((c) => c.name === deliveryMode).id,
        userId: decodedToken.id,
        address: selectedAddress,
      };
      fetch(`${process.env.REACT_APP_BASE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            return stripe.redirectToCheckout({
              sessionId: data['data'].sessionId,
            });
          }
        })
        .catch(() => {
          setToast('Erreur lors de la redirection vers Stripe', 'error');
        });
    } else {
      navigate('/login');
    }
  };

  /**
   * Trigger on each quantity change
   * - Update the quantity in the state of the product
   * - Update the localStorage
   * @param { Event } event Event on quantity change
   * @param { Object } product Product to update
   */
  const onQuantityChange = (event, product) => {
    const newQuantity = event.target.value;
    if (newQuantity > 0 && newQuantity <= 100000000) {
      const newProducts = products.map((p) => {
        if (p.id === product.id) {
          p.quantity = newQuantity;
        }
        return p;
      });
      setProducts(newProducts);
    }
  };

  /**
   * Increase the quantity by 1
   * @param { Object } product Product to increase
   */
  const increaseQuantity = (product) => {
    const newProducts = products.map((p) => {
      if (p.id === product.id && p.category === product.category) {
        if (p.quantity < 100000000) {
          p.quantity = p.quantity + 1;
        } else {
          p.quantity = 100000000;
        }
      }
      return p;
    });
    setProducts(newProducts);
  };

  /**
   * Decrease the quantity by 1
   * @param { Object } product Product to decrease
   */
  const decreaseQuantity = (product) => {
    const newProducts = products.map((p) => {
      if (p.id === product.id && p.category === product.category) {
        if (p.quantity > 1) {
          p.quantity = p.quantity - 1;
        } else {
          p.quantity = 1;
        }
      }
      return p;
    });
    setProducts(newProducts);
  };

  /**
   * Clear the cart and the localStorage
   * @param { Event } event Click event
   */
  const clearCart = (event) => {
    event.preventDefault();
    localStorage.removeItem('cart');
    setProducts([]);
    setSubtotal(0);
    setTotal(0);
    setDeliveryMode(carriers[0].name);
    setToast('Le panier a été vidé', 'success');
    handleClearCart();
  };

  /**
   * Update the localStorage with the new cart
   * @param { Event } event Click event
   */
  const updateCart = (event) => {
    event.preventDefault();
    localStorage.setItem('cart', JSON.stringify(products));
    setToast('Le panier a été mis à jour', 'success');
  };

  /**
   * Trigger on delivery mode change
   * @param { String } mode Delivery mode
   */
  const onDeliveryModeChange = (mode) => setDeliveryMode(mode);

  /**
   * Trigger on address change
   * @param { string } id Address id of the user
   */
  const onAddressChange = (id) => setSelectedAddress(id);

  /**
   * Redirect to product details page
   * @param { Event } event Click event
   * @param { string } id Product id
   */
  const redirectToProductDetails = (event, product) => {
    event.preventDefault();
    navigate(`/products/${product.category.name}/${product.id}`, {
      state: { product },
    });
  };

  return (
    <>
      <div className="home">
        <div className="home_container">
          <div
            className="home_background"
            style={{ backgroundImage: `url(${cartPageBackground})` }}
          ></div>
          <div className="home_content_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="home_content">
                    <div className="home_content">
                      <div className="breadcrumbs">
                        <ul>
                          <li>
                            <Link to="/" className="text-white">
                              Accueil
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/categories/headphones"
                              className="text-white"
                            >
                              Catégories
                            </Link>
                          </li>
                          <li className="active font-weight-bold">Panier</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="cart_info"
        style={
          products.length === 0
            ? { paddingTop: '50px', paddingBottom: '50px' }
            : {}
        }
      >
        <div className="container">
          {products.length > 0 && (
            <>
              <div className="row">
                <div className="col">
                  <div className="cart_info_columns clearfix">
                    <div className="cart_info_col cart_info_col_product">
                      Produit(s)
                    </div>
                    <div className="cart_info_col cart_info_col_price">
                      Prix
                    </div>
                    <div className="cart_info_col cart_info_col_quantity">
                      Quantité
                    </div>
                    <div className="cart_info_col cart_info_col_total">
                      Totale
                    </div>
                  </div>
                </div>
              </div>
              <div className="row cart_items_row">
                <div className="col">
                  {products.map((product) => (
                    <div className="col" key={product.label + '_' + product.id}>
                      <div className="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                        <div className="cart_item_product d-flex flex-row align-items-center justify-content-start">
                          <div className="cart_item_image">
                            <img src={product.image} alt={product.label} />
                          </div>
                          <div className="cart_item_name_container">
                            <div className="cart_item_name">
                              <Link
                                onClick={(event) =>
                                  redirectToProductDetails(event, product)
                                }
                              >
                                {product.label}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="cart_item_price">
                          {Number(product.price).toFixed(2)}€
                        </div>
                        <div className="cart_item_quantity">
                          <div className="product_quantity_container">
                            <div className="product_quantity clearfix">
                              <input
                                id={`quantity_input_${product.id}`}
                                type="text"
                                value={product.quantity}
                                onInput={(event) =>
                                  onQuantityChange(event, product)
                                }
                              />
                              <div className="quantity_buttons">
                                <div
                                  id={`quantity_inc_button_${product.id}`}
                                  className="quantity_inc quantity_control"
                                  onClick={() => increaseQuantity(product)}
                                >
                                  <i
                                    className="fa fa-chevron-up"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div
                                  id={`quantity_dec_button_${product.id}`}
                                  className="quantity_dec quantity_control"
                                  onClick={() => decreaseQuantity(product)}
                                >
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart_item_total">
                          {Number(product.price * product.quantity).toFixed(2)}€
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row row_cart_buttons">
                <div className="col">
                  <div className="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start">
                    <div className="cart_buttons_right">
                      <div
                        className="button clear_cart_button"
                        onClick={clearCart}
                      >
                        <Link>Vider</Link>
                      </div>
                      <div
                        className="button update_cart_button"
                        onClick={updateCart}
                      >
                        <Link>Mettre à jour</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row_extra d-flex justify-content-between">
                <div className="col-lg-4">
                  <div className="delivery">
                    <div className="section_title">Mode de livraison</div>
                    <div className="section_subtitle">
                      Livraison et frais supplémentaires
                    </div>
                    <div className="delivery_options">
                      {carriers.length ? (
                        carriers.map((carrier) => (
                          <label
                            className="delivery_option clearfix"
                            key={carrier.name}
                          >
                            {carrier.name}
                            <input
                              type="radio"
                              name="radio-delivery"
                              checked={deliveryMode === carrier.name}
                              onChange={() =>
                                onDeliveryModeChange(carrier.name)
                              }
                            />
                            <span className="checkmark"></span>
                            <span className="delivery_price">
                              {carrier.fees + '€'}
                            </span>
                          </label>
                        ))
                      ) : !isLogged ? (
                        <p>Aucun mode de livraison, connectez-vous.</p>
                      ) : (
                        <p>Ajouter un mode de livraison dans votre profil.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="carrier">
                    <div className="section_title">Mes adresses</div>
                    <div className="section_subtitle">Adresse de livraison</div>
                    <div className="carrier_options">
                      {addresses.length ? (
                        addresses.map((address) => (
                          <label
                            className="carrier_option clearfix"
                            key={address.id}
                          >
                            {`${address.street} ${address.city} ${address.zip}`}
                            <input
                              type="radio"
                              name="radio-carrier"
                              checked={selectedAddress === address.id}
                              onChange={() => onAddressChange(address.id)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))
                      ) : !isLogged ? (
                        <p>Aucune adresse, connectez-vous.</p>
                      ) : (
                        <p>
                          Ajouter une adresse de livraison dans votre profil.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row_extra mt-0">
                <div className="col-lg-6">
                  <div className="cart_total mt-0">
                    <div className="section_title">Panier totale</div>
                    <div className="section_subtitle">
                      Résumé de la commande
                    </div>
                    <div className="cart_total_container">
                      <ul>
                        <li className="d-flex flex-row align-items-center justify-content-start">
                          <div className="cart_total_title">Sous-total</div>
                          <div className="cart_total_value ml-auto">
                            {subtotal}€
                          </div>
                        </li>
                        <li className="d-flex flex-row align-items-center justify-content-start">
                          <div className="cart_total_title">Livraison</div>
                          <div className="cart_total_value ml-auto">
                            {deliveryMode}
                          </div>
                        </li>
                        <li className="d-flex flex-row align-items-center justify-content-start">
                          <div className="cart_total_title">Total</div>
                          <div className="cart_total_value ml-auto">
                            {total}€
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="button checkout_button">
                      <Link onClick={handlePayment}>Paiement</Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {products.length === 0 && (
            <div className="row">
              <div className="col">
                <div
                  className="cart_container"
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '18px',
                  }}
                >
                  <div className="cart_title">Votre panier est vide.</div>
                  <div className="cart_text mb-2" style={{ marginTop: '50px' }}>
                    Faites un tour dans nos catégories et ajoutez des articles à
                    votre panier.
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ marginTop: '50px' }}
                  >
                    <div className="button" style={{ margin: '5px' }}>
                      <Link to="/categories/headphones">Nos casques</Link>
                    </div>
                    <div className="button" style={{ margin: '5px' }}>
                      <Link to="/categories/tablets">Nos tablettes</Link>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="button" style={{ margin: '5px' }}>
                      <Link to="/categories/phones">Nos téléphones</Link>
                    </div>
                    <div className="button" style={{ margin: '5px' }}>
                      <Link to="/categories/cameras">Nos caméras</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
