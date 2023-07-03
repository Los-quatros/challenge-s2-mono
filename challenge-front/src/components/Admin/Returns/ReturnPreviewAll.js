import React from "react";
import styles from "../../../assets/styles/admin/style.module.css";

const ReturnPreviewAll = () => {
  return (
    <div className="col-lg-6">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title mb-2 d-flex justify-content-between border-bottom pb-4"
          }
        >
          <h4>Demande de retours </h4>
          <a href="#">Voir plus</a>
        </div>
        <div className={`${styles["recent-comment"]} border-bottom pb-3 mb-3`}>
          <div className="card-item">
            <div className="d-flex align-items-center justify-content-between">
              <b style={{ color: "black" }}>John Doe</b>
              <div style={{ color: "black" }}>October 21, 2017</div>
            </div>
            <div style={{ color: "gray" }}>
              Cras sit amet nibh libero, in gravida nulla.
            </div>
            <div className={`${styles["comment-action"]} comment-action`}>
              <div
                className={`${styles["badge"]} ${styles["badge-success"]} badge badge-success`}
              >
                Approved
              </div>
              <span className="m-l-10">
                <i
                  className="fa fa-check"
                  aria-hidden="true"
                  style={{
                    color: "green",
                  }}
                ></i>
                <i
                  className="fa fa-times red"
                  aria-hidden="true"
                  style={{ color: "red" }}
                ></i>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${styles["recent-comment"]} border-bottom pb-3 mb-3`}
          style={{ marginTop: "1vh" }}
        >
          <div className="card-item">
            <div className="d-flex align-items-center justify-content-between">
              <b style={{ color: "black" }}>John Doe</b>
              <div style={{ color: "black" }}>October 21, 2017</div>
            </div>
            <div style={{ color: "gray" }}>
              Cras sit amet nibh libero, in gravida nulla.
            </div>
            <div className={`${styles["comment-action"]} comment-action`}>
              <div
                className={`${styles["badge"]} ${styles["badge-warning"]} badge badge-warning`}
              >
                En attente
              </div>
              <span className="m-l-10">
                <i
                  className="fa fa-check"
                  aria-hidden="true"
                  style={{
                    color: "green",
                  }}
                ></i>
                <i
                  className="fa fa-times red"
                  aria-hidden="true"
                  style={{ color: "red" }}
                ></i>
              </span>
            </div>
          </div>
        </div>

        <div className={styles["recent-comment"]} style={{ marginTop: "1vh" }}>
          <div className="card-item">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <b style={{ color: "black" }}>John Doe</b>
              <div style={{ color: "black" }}>October 21, 2017</div>
            </div>
            <div style={{ color: "gray" }}>
              Cras sit amet nibh libero, in gravida nulla.
            </div>
            <div className={styles["comment-action"] + " comment-action"}>
              <div
                className={
                  styles["badge"] +
                  " " +
                  styles["badge-danger"] +
                  " badge badge-danger"
                }
              >
                Refusé
              </div>
              <span className="m-l-10">
                <i
                  className="fa fa-check"
                  aria-hidden="true"
                  style={{
                    color: "green",
                  }}
                ></i>
                <i
                  className="fa fa-times red"
                  aria-hidden="true"
                  style={{ color: "red" }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPreviewAll;
