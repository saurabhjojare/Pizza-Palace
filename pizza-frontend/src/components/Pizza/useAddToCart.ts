import { useState } from "react";
import { Pizza } from "../../interfaces/Order";
import { getUserIdFromToken, getUserRoleFromToken } from "../../utils/Auth";
import { Roles } from "../enums/Roles";

export const useAddToCart = (pizza: Pizza, addToCartFn: Function) => {
  const [size, setSize] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);

  const role = getUserRoleFromToken();
  const tokenExists = !!getUserIdFromToken();
  const isCustomer = tokenExists && role !== Roles.ADMIN;

  const handleAddToCart = () => {
    addToCartFn(pizza, size, quantity);
    setQuantity(1);
  };

  return {
    size,
    setSize,
    quantity,
    setQuantity,
    isCustomer,
    handleAddToCart,
  };
};
