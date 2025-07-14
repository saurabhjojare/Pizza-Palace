import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Paths } from "../enums/Paths";

const Navbar: React.FC = () => {
  const location = useLocation();

  const adminPaths = [Paths.PIZZA, Paths.ORDER, Paths.CUSTOMER];
  const isAdminPage = adminPaths.includes(location.pathname as Paths);

  const isAddPizzaPage = location.pathname === Paths.ADD_PIZZA;

  return (
    <div className="container-fluid container-with-navbar">
      <div className="navbar d-flex justify-content-center mt-4">
        <ul className="nav nav-pills">
          {isAdminPage && !isAddPizzaPage && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pizza" ? "active" : ""
                  }`}
                  to="/pizza"
                >
                  Pizza List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/customer" ? "active" : ""
                  }`}
                  to="/customer"
                >
                  Customer List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                  to="/order"
                >
                  Order List
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
