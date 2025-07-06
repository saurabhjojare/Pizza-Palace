import React, { useEffect, useState } from "react";
import axios from "axios";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Roles } from "../enums/Roles";

export interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
}
export interface Pizza {
  pizza_id: number;
  name: string;
  type: "Vegetarian" | "Non-Vegetarian";
  imageUrl: string;
  description: string;
  regularPrice: string;
  mediumPrice: string;
  largePrice: string;
}

interface TokenPayload {
  role: string;
  customer_id: number;
  [key: string]: any;
}

const GetPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.role !== Roles.CUSTOMER) {
        navigate("/");
      } else {
        setCustomerId(decoded.customer_id);
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Pizza Palace";
  }, []);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/pizzas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPizzas(response.data.Data);
      } catch (err) {
        setError("Failed to fetch pizza");
      }
    };

    fetchPizzas();
  }, []);

  const addToCart = (pizza: Pizza, size: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.pizza.pizza_id === pizza.pizza_id && item.size === size
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];

        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };

        return updatedItems;
      } else {
        return [...prevItems, { pizza, size, quantity }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const item = updatedItems[index];

      item.quantity = newQuantity;

      const price =
        item.size === "regular"
          ? Number(item.pizza.regularPrice)
          : item.size === "medium"
          ? Number(item.pizza.mediumPrice)
          : Number(item.pizza.largePrice);

      return updatedItems;
    });
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
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

      <h3 className="text-center mb-4">Menu</h3>
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
