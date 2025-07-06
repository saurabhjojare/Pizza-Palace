import React from "react";
import Buy from "./Buy";
import { Pizza } from "./GetPizza";

export interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  customerId: number;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  customerId,
}) => {
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

  return cartItems.length > 0 ? (
    <div className="card mt-4 mb-4 cart-box-shadow">
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
          <Buy
            customerId={customerId}
            deliveryAddress="5678 Oak Avenue, CA"
            cartItems={cartItems.map((item) => ({
              pizza_id: item.pizza.pizza_id,
              size: item.size,
              quantity: item.quantity,
            }))}
            totalAmount={totalAmount}
            clearCart={clearCart}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
