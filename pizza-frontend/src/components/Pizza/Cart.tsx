import React from "react";
import { CartProps } from "../../interfaces/Order";
import { useCart } from "./useCart";
import { getCustomerAddressById } from "../../services/CustomerService";
import { getToken, getUserIdFromToken } from "../../utils/Auth";

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

  const handleClickPlaceOrder = async () => {
    const token = getToken();
    const userId = getUserIdFromToken();
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    try {
      const address = await getCustomerAddressById(Number(userId), token);
      await handlePlaceOrder(address);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to retrieve address or place the order.");
    }
  };

  return cartItems.length > 0 ? (
    <div
      className="mx-auto card mt-4 mb-4 cart-box-shadow w-50"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
    >
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
            onClick={handleClickPlaceOrder}
          >
            {isPlacingOrder ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
