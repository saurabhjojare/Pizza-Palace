import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../../services/PizzaService";
import {
  useCustomerAuth,
  getUserIdFromToken,
  getUserRoleFromToken,
} from "../../utils/Auth";
import { Pizza } from "../../interfaces/Order";
import { useCart } from "../../context/CartContext";
import { Roles } from "../enums/Roles";
import { Paths } from "../enums/Paths";
import { getCustomerNameById } from "../../services/CustomerService";

const GetPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  useCustomerAuth();

  useEffect(() => {
    document.title = "Pizza Palace";

    const userId = getUserIdFromToken();
    const role = getUserRoleFromToken();
    const token = localStorage.getItem("token");

    if (!userId) {
      setFirstName(null);
      navigate(Paths.ROOT);
    } else if (role === Roles.ADMIN) {
      navigate(Paths.PIZZA_LIST);
    } else {
      setCustomerId(Number(userId));
      const fetchFirstName = async () => {
        try {
          const name = await getCustomerNameById(Number(userId), token!);
          setFirstName(name);
        } catch {
          setFirstName(null);
        }
      };
      fetchFirstName();
    }
  }, [navigate]);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await fetchPizzas();
        setPizzas(data);
      } catch {
        setError("Failed to fetch pizza");
      }
    };

    loadPizzas();
  }, []);

  if (error) {
    return (
      <div className="text-center text-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      {cartItems.length > 0 && customerId !== null && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          customerId={customerId}
        />
      )}

      {firstName ? (
        <h3 className="text-center mb-4">Welcome, {firstName} 🍕😋</h3>
      ) : (
        <h3 className="text-center mb-4">Our Menu</h3>
      )}
      <div className="row justify-content-center">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img
                src={pizza.imageUrl}
                className="card-img-top"
                alt={pizza.name}
              />
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">{pizza.description}</p>
                <p className="card-text">
                  <strong>Type:</strong> {pizza.type}
                </p>
                <AddToCart pizza={pizza} addToCart={addToCart} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPizza;
