import React from "react";
import { Pizza } from "./GetPizza";
import Buy from "./Buy";
import { Crust, Topping } from "./Toppings";

interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
  crust: Crust;
  selectedToppings: Topping[];
  totalAmount: number;
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
}) => {
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => {
      const pizzaPrice =
        item.size === "regular"
          ? Number(item.pizza.regularPrice)
          : item.size === "medium"
          ? Number(item.pizza.mediumPrice)
          : Number(item.pizza.largePrice);

      const toppingsPrice = item.selectedToppings.reduce(
        (sum, topping) => sum + topping.price,
        0
      );

      return (
        total + (pizzaPrice + item.crust.price + toppingsPrice) * item.quantity
      );
    }, 0);

  const totalAmount = calculateTotalAmount();

  const handleQuantityChange = (index: number, increment: boolean) => {
    const newQuantity = increment
      ? cartItems[index].quantity + 1
      : cartItems[index].quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(index, newQuantity);
    }
  };

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
                  <strong>Size:</strong> {item.size}
                </p>
                <p className="mb-1">
                  <strong>Crust:</strong> {item.crust.name} : ₹
                  {item.crust.price}
                </p>
                <p className="mb-1">
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
                    <span className="ms-2 me-2">{item.quantity} </span>
                    <button
                      className="btn btn-light btn-sm mx-2"
                      onClick={() => handleQuantityChange(index, true)}
                    >
                      +
                    </button>
                  </div>
                </p>
                <p className="mb-1">
                  <strong>Toppings: </strong>
                  {item.selectedToppings.map((topping) => (
                    <span key={topping.name}>
                      {topping.name} : ₹{topping.price}{" "}
                    </span>
                  ))}
                </p>
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
        <div className="mt-3">
          <h6 className="fs-5 text-end">Total: ₹{totalAmount}</h6>
        </div>
        <div className="text-end mt-3">
          <Buy
            customerId={1}
            deliveryAddress="5678 Oak Avenue, CA"
            cartItems={cartItems.map((item) => ({
              pizza_id: item.pizza.pizza_id,
              size: item.size,
              quantity: item.quantity,
              crust: item.crust.name,
              toppings: item.selectedToppings.map((topping) => ({
                name: topping.name,
                price: topping.price,
              })),
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
