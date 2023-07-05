import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useOrder from "../../../hooks/Admin/useOrder";
import moment from "moment";
import { toast } from "react-toastify";
const OrderPreviewAll = () => {
  const { orders, isLoading, deliveryOrder, error } = useOrder();

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

  const handleDelivery = async (orderId) => {
    try {
      await deliveryOrder(orderId);
      setToast("Commande livrée avec succès", "success");
    } catch (error) {
      setToast("Erreur lors de la livraison de la commande", "error");
    }
  };

  return (
    <div className="col-lg-8">
      <div className={styles.card + " card"} style={{ height: "500px" }}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between pb-1"
          }
        >
          <h4>Toutes les commandes </h4>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div>Une erreur est survenue</div>
        ) : (
          <div className="card-body" style={{ overflow: "scroll" }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>État</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>
                          {order.is_delivered ? (
                            <span className="badge badge-success">Livré</span>
                          ) : (
                            <span className="badge badge-warning">
                              En cours
                            </span>
                          )}
                        </td>
                        <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{order.orderProducts.length}</td>
                        <td className="color-primary">{order.total} €</td>
                        <td>
                          {order.is_delivered ? (
                            <i
                              className="fa fa-check-square pr-2"
                              aria-hidden="true"
                              style={{
                                color: "gray",
                                cursor: "not-allowed",
                              }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-check-square pr-2"
                              aria-hidden="true"
                              style={{
                                color: "green",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDelivery(order.orderId)}
                            ></i>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPreviewAll;
