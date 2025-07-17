import React from "react";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { getToken } from "../../utils/Auth";
import { useGetPizza } from "./useGetPizza";
import { scrollToTopSlow } from "../../utils/scrollUtils";
import "./Pizza.css";

const GetPizza: React.FC = () => {
  const {
    pizzas,
    error,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    customerId,
    firstName,
    searchTerm,
    setSearchTerm,
  } = useGetPizza();

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
        <>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            customerId={customerId}
          />
          <span
            onClick={scrollToTopSlow}
            className="text-black font-weight-light go-to-cart"
            aria-label="Top"
          >
            Cart
          </span>
        </>
      )}

      <h3 className="text-center mb-4 fw-lighter">
        {getToken() && firstName ? `Welcome, ${firstName}` : "Our Menu"}
      </h3>

      {getToken() && (
        <div className="d-flex justify-content-center mb-4">
          <div className="col-10 col-sm-10 col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control py-2 px-4 h4 fw-lighter search-box-shadow"
              placeholder="What's on your mind today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="row justify-content-left">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 d-flex flex-column pizza-card-shadow">
              <img
                src={pizza.imageUrl}
                className="card-img-top pizza-image-size"
                alt={pizza.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" title={pizza.name}>
                  {pizza.name.length > 35
                    ? pizza.name.slice(0, 35) + "..."
                    : pizza.name}
                </h5>
                <p className="card-text" title={pizza.description}>
                  {pizza.description.length > 100
                    ? pizza.description.slice(0, 100) + "..."
                    : pizza.description}
                </p>
                <p className="card-text">
                  <strong>Type:</strong> {pizza.type}
                </p>
                <div className="mt-auto">
                  <AddToCart pizza={pizza} addToCart={addToCart} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPizza;
