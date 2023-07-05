import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import useReturn from "../../../hooks/Admin/useReturn";
import moment from "moment";
const ReturnPreviewAll = () => {
  const { returns, isLoading, acceptReturn, rejectReturn, error, refetch } =
    useReturn();

  return (
    <div className="col-lg-4">
      <div
        className={styles.card + " card"}
        style={{ height: "500px", overflow: "scroll" }}
      >
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title mb-2 d-flex justify-content-between border-bottom pb-4"
          }
        >
          <h4>Demande de retours </h4>
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
          returns &&
          returns.map((ret) => (
            <div
              className={`${styles["recent-comment"]} border-bottom pb-3 mb-3`}
              key={ret.id}
            >
              <div className="card-item">
                <div className="d-flex align-items-center justify-content-between">
                  <b style={{ color: "black" }}>John Doe</b>
                  <div style={{ color: "black" }}>
                    {moment(ret.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
                <div style={{ color: "gray" }}>{ret.reason}</div>
                <div className={`${styles["comment-action"]} comment-action`}>
                  {ret.status === "pending" ? (
                    <div className={`${styles["badge"]} badge badge-warning`}>
                      En attente
                    </div>
                  ) : ret.status === "validated" ? (
                    <div
                      className={`${styles["badge"]} ${styles["badge-success"]} badge badge-success`}
                    >
                      Approuvé
                    </div>
                  ) : (
                    <div
                      className={`${styles["badge"]} ${styles["badge-danger"]} badge badge-danger`}
                    >
                      Rejeté
                    </div>
                  )}
                  {ret.status === "pending" && (
                    <span className="m-l-10">
                      <i
                        className="fa fa-check"
                        aria-hidden="true"
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => acceptReturn(ret.id)}
                      ></i>
                      <i
                        className="fa fa-times red"
                        aria-hidden="true"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => rejectReturn(ret.id)}
                      ></i>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReturnPreviewAll;
