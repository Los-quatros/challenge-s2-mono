import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useOrder from "../../../hooks/Admin/useOrder";
import moment from "moment";

const OrderPreviewAll = () => {
  const { orders, isLoading, deliveryOrder, error, refetch } = useOrder();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue</div>;
  }

  return (
    <div className="col-lg-8">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between pb-1"
          }
        >
          <h4>Toutes les commandes </h4>
          <a href="">Voir plus</a>
        </div>
        <div className="card-body">
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
                          <span className="badge badge-warning">En cours</span>
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
                            onClick={() => deliveryOrder(order.orderId)}
                          ></i>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreviewAll;
