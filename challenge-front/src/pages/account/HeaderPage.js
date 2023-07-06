import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const $ = window.$;

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/**
 * Reset and set active link in li element
 * @param { string } name Account menu name
 */
const resetAndSetActiveLink = (name) => {
  document
    .querySelector("#navbarSupportedContent #navbar")
    .querySelectorAll("li")
    .forEach((li) => {
      if (li.classList.contains("active") && li.id !== `account-${name}`) {
        li.classList.remove("active");
      } else {
        if (li.id === `account-${name}`) {
          li.classList.add("active");
        }
      }
    });
};

function SidebarPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    resetAndSetActiveLink(name);
  }, [name]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    fetch(`http://localhost:4000/users/${decodedToken.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
          const role = (data && data.roles) || "user";
          setUserRole(role);
        } else {
          setToast(
            "Une erreur est survenue lors de la récupération de vos informations",
            "error"
          );
        }
      })
      .catch(() =>
        setToast(
          "Une erreur est survenue lors de la récupération de vos informations",
          "error"
        )
      );
  }, []);

  /**
   * Toggle menu
   */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /**
   * Logout the user
   * @param { Event } event Click event
   */
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    setTimeout(() => {
      setToast("Vous avez été déconnecté", "success");
    }, 500);
  };

  /**
   * Toggle sidebar
   */
  const toggleSidebar = () => $("#sidebar").toggleClass("active");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-primary"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars"></i>
          <span className="sr-only">Burger menu</span>
        </button>
        <button
          className="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          onClick={toggleMenu}
          aria-label="Burger menu"
        >
          <i className="fa fa-bars"></i>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ml-auto" id="navbar">
            <li className="nav-item active profile" id="account-profile">
              <Link to="../../account/profile" className="nav-link">
                Profil
              </Link>
            </li>
            <li className="nav-item orders" id="account-orders">
              <Link to="../../account/orders" className="nav-link">
                Mes commandes
              </Link>
            </li>
            {userRole === "user" && (
              <li className="nav-item addresses" id="account-addresses">
                <Link to="../../account/addresses" className="nav-link">
                  Mes adresses
                </Link>
              </li>
            )}
            {userRole === "seller" && (
              <li className="nav-item products" id="account-products">
                <Link to="../../account/products" className="nav-link">
                  Mes produits
                </Link>
              </li>
            )}
            <li className="nav-item returns" id="account-returns">
              <Link to="../../account/returns" className="nav-link">
                Mes retours
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={logout}>
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SidebarPage;
