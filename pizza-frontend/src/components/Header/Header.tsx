import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/Auth";
import "./Header.css";
import { Paths } from "../enums/Paths";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(Paths.ROOT);
  };

  const showLogoutRoutes = [
    Paths.PIZZA,
    Paths.ADD_PIZZA,
    Paths.ORDER,
    Paths.CUSTOMER,
    Paths.HOME,
  ];

  const showLogout =
    getToken() !== null &&
    (showLogoutRoutes.includes(location.pathname as Paths) ||
      location.pathname.startsWith("/update-pizza/"));

  return (
    <header className="header d-flex justify-content-between align-items-center px-3 py-3 bg-dark">
      <Link to="/home" className="text-decoration-none text-white">
        <h2 className="fw-light mb-0 fs-4">Pizza Palace</h2>
      </Link>

      <div className="d-flex align-items-center">
        {location.pathname === Paths.PIZZA && (
          <Link to="/add-pizza" className="btn text-white me-2">
            Add Pizza
          </Link>
        )}

        {(location.pathname === Paths.ADD_PIZZA ||
          location.pathname.startsWith("/update-pizza/")) && (
          <Link to="/pizza" className="btn text-white me-2">
            Back
          </Link>
        )}

        {showLogout && (
          <button className="btn text-white me-2" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
