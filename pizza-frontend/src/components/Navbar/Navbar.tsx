import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const adminPaths = ["/pizza", "/order", "/customer"];
  const isAdminPage = adminPaths.includes(location.pathname);

  const isAddPizzaPage = location.pathname === "/add-pizza";

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
                  Pizza's
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/customer" ? "active" : ""
                  }`}
                  to="/customer"
                >
                  Customer's
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                  to="/order"
                >
                  Order's
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
