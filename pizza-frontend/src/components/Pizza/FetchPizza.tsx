import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPizzas,
  deletePizza,
  searchPizzasByName,
} from "../../services/PizzaService";
import { Pizza } from "../../interfaces/Order";
import { useAdminAuth } from "../../utils/Auth";
import { useDebounce } from "use-debounce";

const FetchPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useAdminAuth();

  useEffect(() => {
    document.title = "Pizza";
  }, []);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        if (debouncedSearchTerm.trim() === "") {
          const pizzasData = await fetchPizzas();
          setPizzas(pizzasData);
        } else {
          const pizzasData = await searchPizzasByName(
            debouncedSearchTerm.trim()
          );
          setPizzas(pizzasData);
        }
        setError(null);
      } catch {
        setError("Failed to fetch pizzas");
      }
    };

    loadPizzas();
  }, [debouncedSearchTerm]);

  const handleUpdateClick = (pizzaId: number) => {
    navigate(`/update-pizza/${pizzaId}`);
  };

  const handleDeleteClick = async (pizzaId: number) => {
    if (window.confirm("Are you sure you want to delete this pizza?")) {
      try {
        await deletePizza(pizzaId);
        setPizzas(pizzas.filter((pizza) => pizza.pizza_id !== pizzaId));
      } catch {
        setError("Failed to delete pizza");
      }
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
            <div className="card shadow-sm h-100 border-0 rounded-4">
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
                    className="btn btn-success px-4"
                    onClick={() => handleUpdateClick(pizza.pizza_id)}
                  >
                    <i className="bi bi-box2"></i>
                  </button>
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => handleDeleteClick(pizza.pizza_id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {pizzas.length === 0 && (
          <div className="col-12">
            <div className="text-center">NowhereMan</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchPizza;
