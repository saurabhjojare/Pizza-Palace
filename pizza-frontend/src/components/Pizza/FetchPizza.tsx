import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, deletePizza } from "../../services/PizzaService";
import { Pizza } from "../../interfaces/Order";
import { useAdminAuth } from "../../utils/Auth";

const FetchPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useAdminAuth();

  useEffect(() => {
    document.title = "Pizzas";
  }, []);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const pizzasData = await fetchPizzas();
        setPizzas(pizzasData);
      } catch {
        setError("Failed to fetch pizza");
      }
    };

    loadPizzas();
  }, []);

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

  if (error) return <p className="text-center">{error}</p>;

  return (
    <div className="container mt-3">
      {/* <h3 className="text-center mb-4">Pizza List</h3> */}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <tr key={pizza.pizza_id}>
              <td>{pizza.pizza_id}</td>
              <td>{pizza.name}</td>
              <td>{pizza.type}</td>
              <td>
                Regular ${pizza.regularPrice}
                <br />
                Medium ${pizza.mediumPrice}
                <br />
                Large ${pizza.largePrice}
              </td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleUpdateClick(pizza.pizza_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(pizza.pizza_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchPizza;
