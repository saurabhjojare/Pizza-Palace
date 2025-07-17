import React from "react";
import { useFetchPizza } from "./useFetchPizza";
import "./Pizza.css";

const FetchPizza: React.FC = () => {
  const {
    pizzas,
    error,
    searchTerm,
    setSearchTerm,
    handleUpdateClick,
    handleDeleteClick,
  } = useFetchPizza();

  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center mb-4">
        <div className="col-10 col-sm-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control py-2 px-4 h4 fw-lighter search-box-shadow"
            placeholder="Search Pizza"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 border-0 rounded-4 p-4">
              <div className="card-body">
                <h5 className="card-title fw-bold">{pizza.name}</h5>
                <h6
                  className={`card-subtitle mb-2 ${
                    pizza.type.toLowerCase() === "vegetarian"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {pizza.type}
                </h6>
                <p className="card-text mb-3">
                  <strong>Regular:</strong> ${pizza.regularPrice}
                  <br />
                  <strong>Medium:</strong> ${pizza.mediumPrice}
                  <br />
                  <strong>Large:</strong> ${pizza.largePrice}
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-outline-secondary px-4 w-50"
                    onClick={() => handleUpdateClick(pizza.pizza_id)}
                  >
                    <i className="bi bi-box2"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger px-4 w-50"
                    onClick={() => handleDeleteClick(pizza.pizza_id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {pizzas.length === 0 && <span></span>}
      </div>
    </div>
  );
};

export default FetchPizza;
