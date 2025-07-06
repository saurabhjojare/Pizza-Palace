import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pizza } from "../pizza/GetPizza";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";

const FetchPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role: string | null = null;
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      role = payload.role;
    } catch (e) {
      role = null;
    }
  }

  useEffect(() => {
    if (role !== Roles.ADMIN) {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    document.title = "Pizza's";
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/pizzas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPizzas(response.data.Data);
      })
      .catch(() => {
        setError("Failed to fetch pizza");
      });
  }, [token]);

  const handleUpdateClick = (pizzaId: number) => {
    navigate(`/update-pizza/${pizzaId.toString()}`);
  };

  const handleDeleteClick = (pizzaId: number) => {
    if (window.confirm("Are you sure you want to delete this pizza?")) {
      axios
        .delete(`http://localhost:5000/api/v1/pizzas/${pizzaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setPizzas(pizzas.filter((pizza) => pizza.pizza_id !== pizzaId));
        })
        .catch(() => {
          setError("Failed to delete pizza");
        });
    }
  };

  if (error) return <p className="text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Pizza List</h3>
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
