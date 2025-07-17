import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../utils/Auth";
import { useFetchPizza } from "./useFetchPizza";
import { Constants } from "../enums/Constants";

const FetchPizza: React.FC = () => {
  const { pizzas, error, searchTerm, setSearchTerm, removePizza } =
    useFetchPizza();
  const navigate = useNavigate();

  useAdminAuth();

  useEffect(() => {
    document.title = Constants.PIZZAS;
  }, []);

  const handleUpdateClick = (pizzaId: number) => {
    navigate(`/update-pizza/${pizzaId}`);
  };

  const handleDeleteClick = async (pizzaId: number) => {
    if (window.confirm("Confirm?")) {
      await removePizza(pizzaId);
    }
  };

  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center mb-4">
        <div className="col-10 col-sm-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control py-2 px-4 h4 fw-lighter"
            placeholder="Search Pizza"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow:
                "inset 0 30px 60px -12px rgba(250, 250, 250, 0.25), inset 0 18px 36px -18px rgba(180, 167, 167, 0.3)",
            }}
          />
        </div>
      </div>

      {error && <p className="text-center text-danger">{error}</p>}

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
