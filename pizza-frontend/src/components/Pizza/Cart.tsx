import React, { useState } from "react";
import { CartProps } from "../../interfaces/Order";
import { placeOrder } from "../../services/OrderService";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  customerId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleQuantityChange = (index: number, increment: boolean) => {
    const newQuantity = increment
      ? cartItems[index].quantity + 1
      : cartItems[index].quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(index, newQuantity);
    }
  };

  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => {
      const price =
        item.size === "regular"
          ? Number(item.pizza.regularPrice)
          : item.size === "medium"
          ? Number(item.pizza.mediumPrice)
          : Number(item.pizza.largePrice);
      return total + price * item.quantity;
    }, 0);

  const totalAmount = calculateTotalAmount();

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    const token = localStorage.getItem(Constants.TOKEN.toLowerCase());

    if (!token) {
      alert(Messages.AUTH_TOKEN_MISSING);
      return;
    }

    setIsPlacingOrder(true);

    try {
      console.log(Messages.SENDING_ORDER, {
        customerId,
        deliveryAddress: address,
        cartItems,
      });

      await placeOrder(
        token,
        customerId,
        address,
        cartItems.map((item) => ({
          pizza_id: item.pizza.pizza_id,
          size: item.size,
          quantity: item.quantity,
        }))
      );

      clearCart();
      setShowModal(false);
      setAddress("");
    } catch (error: any) {
      console.error(
        Messages.ERROR_WHILE_BUYING,
        error?.response?.data || error.message
      );
      alert(
        `Failed to place order: ${
          error?.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsPlacingOrder(false);
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
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Delivery Address</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  placeholder="1234 Example Street, City, Zip"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={isPlacingOrder}
                  onClick={handlePlaceOrder}
                >
                  {isPlacingOrder ? "Placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Cart;
