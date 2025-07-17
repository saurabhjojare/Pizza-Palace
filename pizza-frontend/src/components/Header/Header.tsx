import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import "./Header.css";
import { Paths } from "../enums/Paths";
import { useCart } from "../../context/CartContext";
import { Roles } from "../enums/Roles";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const token = getToken();
  const role = getUserRoleFromToken();

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("token");
    navigate(Paths.ROOT);
  };

  const showLogout =
    token !== null &&
    ![Paths.LOGIN, Paths.REGISTER, Paths.NOT_FOUND].includes(
      location.pathname as Paths
    );

  const showMyOrders =
    token !== null &&
    role === Roles.CUSTOMER &&
    ![Paths.LOGIN, Paths.REGISTER, Paths.NOT_FOUND, Paths.MY_ORDERS].includes(
      location.pathname as Paths
    );

  const showMyProfile =
    token !== null &&
    [Roles.CUSTOMER, Roles.ADMIN].includes(role as Roles) &&
    ![Paths.LOGIN, Paths.REGISTER, Paths.NOT_FOUND, Paths.MY_PROFILE].includes(
      location.pathname as Paths
    );

  return (
    <header className="header d-flex justify-content-between align-items-center px-3 py-3 bg-dark custom-shadow">
      <Link to={Paths.ROOT} className="text-decoration-none text-white">
        <h2 className="fw-light mb-0 fs-4 dancing-script">Pizza Palace</h2>
      </Link>

      <div className="d-flex align-items-center">
        {location.pathname === Paths.PIZZA_LIST && (
          <Link
            to={Paths.ADD_PIZZA}
            className="text-white me-2"
            aria-label="Add Pizza"
          >
            <i
              className="bi bi-plus-square me-3 fs-5"
              title="Add Pizza"
              aria-hidden="true"
            ></i>
          </Link>
        )}

        {token !== null &&
          (location.pathname === Paths.ADD_PIZZA ||
            location.pathname.startsWith("/update-pizza/") ||
            location.pathname.startsWith("/update-profile")) && (
            <button
              onClick={() => navigate(-1)}
              className="text-white me-4 text-decoration-none bg-transparent border-0 cursor-pointer"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}

        {showMyProfile && (
          <Link
            to={Paths.MY_PROFILE}
            className="text-white"
            aria-label="My Profile"
          >
            <i
              className="bi bi-person me-4 fs-5"
              title="My Profile"
              aria-hidden="true"
            ></i>
          </Link>
        )}

        {showMyOrders && (
          <Link
            to={Paths.MY_ORDERS}
            className="text-white"
            aria-label="My Orders"
          >
            <i
              className="bi bi-list-ol fs-5 me-4"
              title="My Orders"
              aria-hidden="true"
            ></i>
          </Link>
        )}

        {showLogout ? (
          <span
            className="text-white"
            onClick={handleLogout}
            aria-label="Log Out"
          >
            <i
              className="bi bi-box-arrow-right me-3 fs-5 cursor-pointer"
              title="Log Out"
              aria-hidden="true"
            ></i>
          </span>
        ) : (
          ![Paths.LOGIN, Paths.REGISTER, Paths.NOT_FOUND].includes(
            location.pathname as Paths
          ) && (
            <Link
              to={Paths.LOGIN}
              className="text-white text-decoration-none me-2"
            >
              Get Started
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
