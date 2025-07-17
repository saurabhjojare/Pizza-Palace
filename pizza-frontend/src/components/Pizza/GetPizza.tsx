import React from "react";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import { getToken } from "../../utils/Auth";
import { useGetPizza } from "./useGetPizza";
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

  const scrollToTopSlow = () => {
    const duration = 1000;
    const start = window.scrollY;
    const startTime = performance.now();

    const scrollStep = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));

      window.scrollTo(0, start * (1 - easeInOut));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

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

      {cartItems.length > 0 && customerId !== null && (
        <span
          onClick={scrollToTopSlow}
          className="text-black font-weight-light go-to-cart"
          aria-label="Top"
        >
          Cart
        </span>
      )}

      {getToken() && firstName ? (
        <h3 className="text-center mb-4 fw-lighter">Welcome, {firstName} </h3>
      ) : (
        <h3 className="text-center mb-4 fw-lighter">Our Menu</h3>
      )}

      {getToken() && (
        <div className="d-flex justify-content-center mb-4">
          <div className="col-10 col-sm-10 col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control py-2 px-4 h4 fw-lighter"
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
              className="card h-100 d-flex flex-column"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <img
                src={pizza.imageUrl}
                className="card-img-top"
                alt={pizza.name}
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
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
                <p className="card-text ">
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
