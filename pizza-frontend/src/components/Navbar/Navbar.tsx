import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Paths } from "../enums/Paths";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  const adminPaths = [
    Paths.PIZZA_LIST,
    Paths.ORDER,
    Paths.CUSTOMER,
    Paths.ADMIN,
  ];
  const isAdminPage = adminPaths.includes(location.pathname as Paths);

  return (
    <div className="container-fluid container-with-navbar">
      <div className="navbar d-flex justify-content-center mt-4">
        <ul className="nav nav-pills ">
          {isAdminPage && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pizza-list" ? "active" : ""
                  }`}
                  to="/pizza-list"
                >
                  Pizzas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/customer" ? "active" : ""
                  }`}
                  to="/customer"
                >
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/admin" ? "active" : ""
                  }`}
                  to="/admin"
                >
                  Admins
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                  to="/order"
                >
                  Orders
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
