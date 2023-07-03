import React, { useState } from "react";
import styles from "../../../assets/styles/admin/style.module.css";
import ClientPopup from "./ClientPopup";
import { useQuery, useMutation } from "react-query";

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

  const handleSave = (updatedUser) => {
    console.log(updatedUser);
    closePopup();
  };

  const users = [
    {
      id: 1,
      email: "Yacine1.soussi@gmail.com",
      lastName: "Soussi",
      firstName: "Yacine",
    },
    {
      id: 2,
      email: "YacineCDC@gmail.com",
      lastName: "Soussi",
      firstName: "Yacine",
    },
  ];

  return (
    <div className="col-lg-6">
      <div className={styles.card + " card"}>
        <div
          className={
            styles["card-title"] +
            " " +
            styles.pr +
            " card-title d-flex justify-content-between"
          }
        >
          <h4>Tous les clients </h4>
          <button className="btn btn-primary" onClick={() => openPopup({})}>
            Ajouter
          </button>
        </div>
        <div className="card-body">
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
                {users.map((user) => (
                  <tr key={user.id} onClick={() => openPopup(user)}>
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
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
