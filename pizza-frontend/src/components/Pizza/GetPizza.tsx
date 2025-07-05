import React, { useEffect, useState } from "react";
import axios from "axios";
import AddToCart from "../Pizza/AddToCart";
import Cart from "../Pizza/Cart";
import { Crust, Topping } from "./Toppings";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
  crust: Crust;
  selectedToppings: Topping[];
  totalAmount: number;
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
      if (decoded.role !== "customer") {
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

  const addToCart = (
    pizza: Pizza,
    size: string,
    quantity: number,
    crust: Crust,
    selectedToppings: Topping[]
  ) => {
    const price =
      size === "regular"
        ? Number(pizza.regularPrice)
        : size === "medium"
        ? Number(pizza.mediumPrice)
        : Number(pizza.largePrice);

    const toppingsPrice = selectedToppings.reduce(
      (sum, topping) => sum + topping.price,
      0
    );
    const itemPrice = price + crust.price + toppingsPrice;
    const totalAmount = itemPrice * quantity;

    setCartItems((prevItems) => [
      ...prevItems,
      { pizza, size, quantity, crust, selectedToppings, totalAmount },
    ]);
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

      const toppingsPrice = item.selectedToppings.reduce(
        (sum, topping) => sum + topping.price,
        0
      );

      item.totalAmount =
        (price + item.crust.price + toppingsPrice) * newQuantity;
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
                <p className="card-text">
                  <strong>Prices:</strong> <br />
                  Regular: ₹{pizza.regularPrice} <br />
                  Medium: ₹{pizza.mediumPrice} <br />
                  Large: ₹{pizza.largePrice}
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
