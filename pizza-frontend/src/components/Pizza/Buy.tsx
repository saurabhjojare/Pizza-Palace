import React from "react";
import axios from "axios";

interface BuyProps {
  customerId: number;
  deliveryAddress: string;
  cartItems: {
    pizza_id: number;
    size: string;
    quantity: number;
  }[];
  totalAmount: number;
  clearCart: () => void;
}

const Buy: React.FC<BuyProps> = ({
  customerId,
  deliveryAddress,
  cartItems,
  totalAmount,
  clearCart,
}) => {
  const token = localStorage.getItem("token");

  const handleBuy = async () => {
    try {
      const payload = {
        customer_id: customerId,
        delivery_address: deliveryAddress,
        total_amount: totalAmount,
        status: true,
        pizza: cartItems,
      };

      console.log("Sending order:", payload); // Debug

      await axios.post("http://localhost:5000/api/v1/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (error: any) {
      console.error("Buy Error:", error?.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  return (
    <button className="btn btn-success" onClick={handleBuy}>
      Buy Now
    </button>
  );
};

export default Buy;
