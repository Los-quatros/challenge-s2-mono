import React from "react";
import styles from "../../assets/styles/admin/sidebar.module.css";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location = "/login";
  };
  return (
    <div
      className={`${styles.sidebar} ${styles["sidebar-hide-to-small"]} ${styles["sidebar-shrink"]} ${styles["sidebar-gestures"]}`}
    >
      <div
        className={`${styles.nano} d-flex justify-content-center align-items-end mb-2`}
      >
        <ul>
          <li>
            <button className="btn btn-dark " onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Deconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
