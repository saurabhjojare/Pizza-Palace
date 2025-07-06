import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const showLogoutRoutes = [
    "/pizza",
    "/add-pizza",
    "/order",
    "/customer",
    "/home",
  ];

  const showLogout =
    showLogoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/update-pizza/");

  return (
    <header className="header d-flex justify-content-between align-items-center px-3 py-2 bg-dark">
      <Link to="/home" className="text-decoration-none text-white">
        <h2 className="fw-light mb-0">Pizza Palace</h2>
      </Link>

      <div className="d-flex align-items-center">
        {location.pathname === "/pizza" && (
          <Link to="/add-pizza" className="btn text-white me-2">
            Add Pizza
          </Link>
        )}

        {location.pathname === "/add-pizza" ||
        location.pathname.startsWith("/update-pizza/") ? (
          <Link to="/pizza" className="btn text-white me-2">
            Back
          </Link>
        ) : null}

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
