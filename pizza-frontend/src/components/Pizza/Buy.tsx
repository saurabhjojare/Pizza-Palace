import React from "react";
import axios from "axios";

interface CartItemPayload {
  pizza_id: number;
  size: string;
  quantity: number;
}

interface BuyProps {
  customerId: number;
  deliveryAddress: string;
  cartItems: CartItemPayload[];
  clearCart: () => void;
  totalAmount: number;
}

const Buy: React.FC<BuyProps> = ({
  customerId,
  deliveryAddress,
  cartItems,
  clearCart,
  totalAmount,
}) => {
  const token = localStorage.getItem("token");

  const handleBuy = async () => {
    if (!token) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    try {
      const payload = {
        customer_id: customerId,
        delivery_address: deliveryAddress,
        status: "pending",
        orderLines: cartItems.map(({ pizza_id, size, quantity }) => ({
          pizza_id,
          size,
          quantity,
        })),
      };

      console.log("Sending order:", payload);

      await axios.post("http://localhost:5000/api/v1/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (error: any) {
      console.error("Buy Error:", error?.response?.data || error.message);
      alert(
        `Failed to place order: ${
          error?.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center gap-3">
      <span className="fw-bold fs-5">₹{totalAmount.toFixed(2)}</span>
      <button className="btn btn-success" onClick={handleBuy}>
        Buy Now
      </button>
    </div>
  );
};

export default Buy;
