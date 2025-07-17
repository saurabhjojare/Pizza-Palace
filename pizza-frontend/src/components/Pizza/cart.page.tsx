import React from "react";
import { CartProps } from "../../interfaces/order.interface";
import { useCart } from "./cart.use";
import "./cart.css";

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  customerId,
}) => {
  const {
    isPlacingOrder,
    handleQuantityChange,
    calculateTotalAmount,
    handlePlaceOrder,
  } = useCart(cartItems, removeFromCart, updateQuantity, clearCart, customerId);

  const totalAmount = calculateTotalAmount();

  return cartItems.length > 0 ? (
    <div className="mx-auto card mt-4 mb-4 cart-box-shadow w-50 cart-shadow">
      <div className="card-body">
        <h5 className="card-title fs-3">Cart</h5>
        <ul className="list-group list-group-flush">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="fs-5">
                <p className="mb-1">
                  <strong>Pizza:</strong> {item.pizza.name}
                </p>
                <p className="mb-1">
                  <strong>Size:</strong>{" "}
                  {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                </p>
                <div className="d-flex align-items-center mt-2">
                  <strong>Quantity:</strong>
                  {item.quantity > 1 && (
                    <button
                      className="btn btn-light btn-sm mx-2"
                      onClick={() => handleQuantityChange(index, false)}
                    >
                      -
                    </button>
                  )}
                  <span className="ms-2 me-2">{item.quantity}</span>
                  <button
                    className="btn btn-light btn-sm mx-2"
                    onClick={() => handleQuantityChange(index, true)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-3 text-end">
          <h6 className="fs-5">Total: ₹{totalAmount.toFixed(2)}</h6>
        </div>

        <div className="text-end mt-3">
          <button
            className="btn btn-success"
            disabled={isPlacingOrder}
            onClick={handlePlaceOrder}
          >
            {isPlacingOrder ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
