import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../../services/PizzaService";
import { useCustomerAuth, getUserIdFromToken } from "../../utils/Auth";
import { Pizza } from "../../interfaces/Order";
import { CartItem } from "../../interfaces/Order";

const GetPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useCustomerAuth();

  useEffect(() => {
    document.title = "Pizza Palace";

    const userId = getUserIdFromToken();
    if (userId) {
      setCustomerId(Number(userId));
    } else {
      navigate("/");
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

  const addToCart = (pizza: Pizza, size: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.pizza.pizza_id === pizza.pizza_id && item.size === size
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }

      return [...prevItems, { pizza, size, quantity }];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (index: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
  };

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
