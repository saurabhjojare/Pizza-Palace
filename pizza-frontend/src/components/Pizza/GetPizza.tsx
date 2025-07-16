import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, searchPizzasByName } from "../../services/PizzaService";
import {
  useCustomerAuth,
  getUserIdFromToken,
  getUserRoleFromToken,
  getToken,
} from "../../utils/Auth";
import { Pizza } from "../../interfaces/Order";
import { Roles } from "../enums/Roles";
import { Paths } from "../enums/Paths";
import { getCustomerNameById } from "../../services/CustomerService";
import { useDebounce } from "use-debounce";
import { useCart } from "../../context/CartContext";

const GetPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const navigate = useNavigate();
  useCustomerAuth();

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  // Load customer info and redirect based on role
  useEffect(() => {
    document.title = "Pizza Palace";

    const userId = getUserIdFromToken();
    const role = getUserRoleFromToken();
    const token = getToken();

    if (!userId || !token) {
      setFirstName(null);
      setCustomerId(null);
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

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      try {
        if (debouncedSearchTerm.trim() === "") {
          const data = await fetchPizzas();
          setPizzas(data);
        } else {
          const data = await searchPizzasByName(debouncedSearchTerm.trim());
          setPizzas(data);
        }
      } catch {
        setError("Failed to search pizzas");
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  // Detect logout
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      if (!token) {
        setFirstName(null);
        setCustomerId(null);
      }
    }, 1000);
    return () => clearInterval(interval);
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

      {getToken() && firstName ? (
        <h3 className="text-center mb-4 fw-lighter">Welcome, {firstName}!</h3>
      ) : (
        <h3 className="text-center mb-4 fw-lighter">Our Menu</h3>
      )}

      {getToken() && (
        <div className="d-flex justify-content-center mb-4">
          <div className="col-10 col-sm-10 col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control py-2 px-4 h4 fw-lighter py-2 px-4 h4 fw-lighter"
              placeholder="What's on your mind today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                boxShadow:
                  "inset 0 30px 60px -12px rgba(250, 250, 250, 0.25), inset 0 18px 36px -18px rgba(180, 167, 167, 0.3)",
              }}
            />
          </div>
        </div>
      )}

      <div className="row justify-content-left">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
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
