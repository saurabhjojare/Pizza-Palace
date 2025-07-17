import { useState } from "react";
import { CartProps } from "../../interfaces/Order";
import { placeOrder } from "../../services/OrderService";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";

export const useCart = (
  cartItems: CartProps["cartItems"],
  removeFromCart: CartProps["removeFromCart"],
  updateQuantity: CartProps["updateQuantity"],
  clearCart: CartProps["clearCart"],
  customerId: CartProps["customerId"]
) => {
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

  const handlePlaceOrder = async (address: string) => {
    if (!address.trim()) {
      alert("Please provide a valid delivery address.");
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

  return {
    isPlacingOrder,
    handleQuantityChange,
    calculateTotalAmount,
    handlePlaceOrder,
  };
};
