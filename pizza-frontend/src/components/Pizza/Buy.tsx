import React from "react";
import { BuyProps } from "../../interfaces/Order";
import { placeOrder } from "../../services/OrderService";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";

const Buy: React.FC<BuyProps> = ({
  customerId,
  deliveryAddress,
  cartItems,
  clearCart,
  totalAmount,
}) => {
  const token = localStorage.getItem(Constants.TOKEN.toLowerCase());

  const handleBuy = async () => {
    if (!token) {
      alert(Messages.AUTH_TOKEN_MISSING);
      return;
    }

    try {
      console.log(Messages.SENDING_ORDER, {
        customerId,
        deliveryAddress,
        cartItems,
      });

      await placeOrder(token, customerId, deliveryAddress, cartItems);

      alert(Messages.ORDER_PLACED_SUCCESSFULLY);
      clearCart();
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
