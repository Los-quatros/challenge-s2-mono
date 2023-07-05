import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import ClientPopup from "./ClientPopup";
import { useQuery, useMutation } from "react-query";
import useClient from "../../../hooks/Admin/useClient";

const ClientPreviewAll = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openPopup = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  const { users, isLoading, saveUser, deleteUser } = useClient();

  const handleSave = async (user) => {
    try {
      await saveUser(user);
      closePopup();
    } catch (error) {
      console.log(error);
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
          <h4>Tous les clients </h4>
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
        ) : (
          <div className="card-body" style={{ overflow: "scroll" }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>
                          <span className="m-l-10">
                            <i
                              className="fa fa-pencil-square-o pr-2"
                              aria-hidden="true"
                              style={{
                                color: "blue",
                                cursor: "pointer",
                              }}
                              onClick={() => openPopup(user)}
                            ></i>
                            <i
                              className="fa fa-trash pr-2"
                              aria-hidden="true"
                              style={{
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteUser(user.id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <ClientPopup
          user={selectedUser}
          onClose={closePopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClientPreviewAll;
