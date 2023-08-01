import { useEffect, useState } from 'react';

import defaultProduct from '../../assets/images/categories/default.png';
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

function OrdersPage({ role }) {
  const { name } = useParams();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  /**
   * Submit return request on selected order
   */
  const submitReturnRequest = () => {
    if (selectedProducts.length === 0) {
      setToast('Veuillez sélectionner au moins un produit', 'info');
    } else if (returnReason === '') {
      setToast('Veuillez saisir une raison de retour', 'info');
    } else {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      fetch(
        `${process.env.REACT_APP_BASE_API_URL}/returns/users/${decodedToken.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderProducts: selectedProducts.map((product) => {
              return {
                id_product: product.id,
                nbItemReturned: product.quantity,
              };
            }),
            reason: returnReason,
            total: selectedProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0,
            ),
          }),
        },
      )
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            updateOrders(data);
            setToast(
              'Votre demande de retour a bien été prise en compte',
              'success',
            );
            resetFields();
          }
        })
        .catch(() =>
          setToast(
            'Une erreur est survenue lors de la demande de retour',
            'error',
          ),
        );
    }
  };

  /**
   * Update orders after return request
   * @param { any } data Order data
   */
  const updateOrders = (data) => {
    const newOrders = orders.map((order) => {
      order.products = order.products.map((product) => {
        if (product.id === data.orderProducts) {
          product.is_returned = true;
        }
        return product;
      });
      return order;
    });
    setOrders(newOrders);
  };

  /**
   * Handle product selection
   * @param { object } product Selected product
   */
  const handleProductSelection = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  /**
   * Handle select user order
   * @param { object } order Order object of user
   */
  const handleSelectUserOrder = (order) => {
    if (!order.is_delivered) {
      setToast('Demande de retour impossible, commande non livrée', 'info');
    } else {
      setSelectedOrder(order);
    }
  };

  /**
   * Cancel return request
   */
  const cancelReturnRequest = () => resetFields();

  /**
   * Reset fields of order return
   */
  const resetFields = () => {
    setSelectedProducts([]);
    setSelectedOrder(null);
    setReturnReason('');
  };

  /**
   * Init orders for user
   */
  const initOrdersUser = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    fetch(
      `${process.env.REACT_APP_BASE_API_URL}/orders/users/${decodedToken.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          const orders = [];
          data.forEach((order) => {
            if (order.is_paid) {
              const products = order.products
                .map((product) => {
                  if (product?.['product']) {
                    return {
                      id: product.id,
                      name: product['product'].label,
                      quantity: product.quantity,
                      price: product['product'].price,
                      image: product['product'].image
                        ? product['product'].image
                        : defaultProduct,
                      is_returned: product.is_returned,
                    };
                  } else {
                    return null;
                  }
                })
                .filter(Boolean);
              orders.push({
                id: order.orderId,
                date: order.date ? order.date : new Date().toLocaleDateString(),
                products: products,
                address: `${order.address.street} ${order.address.zip} ${order.address.city}`,
                carrier: order.carrier.name,
                is_delivered: order.is_delivered,
              });
            }
          });
          setOrders(orders);
        }
      })
      .catch(() =>
        setToast(
          'Une erreur est survenue lors de la récupération des commandes',
          'error',
        ),
      );
  };

  /**
   * Init sales for seller
   */
  const initSalesSeller = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    fetch(
      `${process.env.REACT_APP_BASE_API_URL}/sellers/${decodedToken.id}/sales`,
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
          const sales = [];
          data.forEach((sale) => {
            const products = sale.products.map((product) => {
              return {
                id: product['product'].id,
                name: product['product'].label,
                quantity: product['product'].quantity,
                price: product['product'].price,
                image: product['product'].image
                  ? product['product'].image
                  : defaultProduct,
              };
            });
            sales.push({
              id: sale.orderId,
              date: sale.date ? sale.date : new Date().toLocaleDateString(),
              products: products,
              address: `${sale.address.street} ${sale.address.zip} ${sale.address.city}`,
              carrier: sale.carrier.name,
            });
          });
          setSales(sales);
        }
      })
      .catch(() =>
        setToast(
          'Une erreur est survenue lors de la récupération des ventes',
          'error',
        ),
      );
  };

  useEffect(() => {
    if (role === 'user') {
      initOrdersUser();
    } else if (role === 'seller') {
      initSalesSeller();
    }
  }, [role]);

  return (
    <div className="container">
      {orders.length > 0
        ? orders.map((order, index) => (
            <div key={`${order.name}-${index}`} className="card mb-3">
              <div className="card-header">
                <h4>Numéro de commande : {order.id}</h4>
                <p>Date : {order.date}</p>
              </div>
              <div className="card-body">
                <h5>Produits :</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Nom du produit</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      {order.is_delivered && <th>Retour</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={`${product.label}-${index}`}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}€</td>
                        {order.is_delivered && (
                          <td>
                            <input
                              type="checkbox"
                              disabled={product.is_returned}
                              checked={
                                product.is_returned ||
                                selectedProducts.includes(product)
                              }
                              onChange={() => handleProductSelection(product)}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="transporter-info d-flex">
                  <h5>Transporteur :</h5>
                  <span className="ml-2">
                    {(order.carrier === 'standard' && 'Standard') ||
                      (order.carrier === 'express' && 'Rapide') ||
                      (order.carrier === 'free' && 'Gratuit')}
                  </span>
                </div>
                <h5>Adresse de livraison :</h5>
                <p>{order.address}</p>
                <div className="text-left">
                  {selectedOrder && selectedOrder.id === order.id ? (
                    <>
                      <div>
                        <button
                          className="btn btn-secondary  mr-2"
                          onClick={cancelReturnRequest}
                        >
                          Annuler le retour
                        </button>
                        <button
                          className="btn btn-secondary "
                          onClick={submitReturnRequest}
                        >
                          Valider le retour
                        </button>
                      </div>
                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Raison du retour ..."
                          value={returnReason}
                          onChange={(event) =>
                            setReturnReason(event.target.value)
                          }
                        ></textarea>
                      </div>
                    </>
                  ) : (
                    <button
                      disabled={
                        !order.is_delivered ||
                        order.products.every((product) => product.is_returned)
                      }
                      style={{
                        cursor:
                          !order.is_delivered ||
                          order.products.every((product) => product.is_returned)
                            ? 'not-allowed'
                            : 'pointer',
                      }}
                      className="btn btn-secondary"
                      onClick={() => handleSelectUserOrder(order)}
                    >
                      Demander un retour
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        : role === 'user' && (
            <div className="text-center mt-5">
              <h3>Aucune commande à afficher.</h3>
              <p>Vous n'avez passé aucune commande pour le moment.</p>
            </div>
          )}
      {sales.length > 0
        ? sales.map((sale, index) => (
            <div key={`${sale.name}-${index}`} className="card mb-3">
              <div className="card-header">
                <h4>Numéro de commande : {sale.id}</h4>
                <p>Date : {sale.date}</p>
              </div>
              <div className="card-body">
                <h5>Produits :</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Nom du produit</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.products.map((product, index) => (
                      <tr key={`${product.label}-${index}`}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="transporter-info d-flex">
                  <h5>Transporteur :</h5>
                  <span className="ml-2">
                    {(sale.carrier === 'standard' && 'Standard') ||
                      (sale.carrier === 'express' && 'Rapide') ||
                      (sale.carrier === 'free' && 'Gratuit')}
                  </span>
                </div>
                <h5>Adresse de livraison :</h5>
                <p>{sale.address}</p>
              </div>
            </div>
          ))
        : role === 'seller' && (
            <div className="text-center mt-5">
              <h3>Aucune vente à afficher</h3>
              <p>Vous n'avez effectué aucune vente pour le moment.</p>
            </div>
          )}
    </div>
  );
}

export default OrdersPage;
