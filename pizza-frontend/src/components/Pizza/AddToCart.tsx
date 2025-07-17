import React, { useState } from "react";
import { AddToCartProps } from "../../interfaces/Order";
import { getUserIdFromToken, getUserRoleFromToken } from "../../utils/Auth";
import { Roles } from "../enums/Roles";

const AddToCart: React.FC<AddToCartProps> = ({ pizza, addToCart }) => {
  const [size, setSize] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);
  const role = getUserRoleFromToken();

  const tokenExists = !!getUserIdFromToken();

  const handleAddToCart = () => {
    addToCart(pizza, size, quantity);
    setQuantity(1);
  };

  return (
    <div>
      {tokenExists && role !== Roles.ADMIN ? (
        <>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="form-select mb-2"
          >
            <option value="regular">Regular - ₹{pizza.regularPrice}</option>
            <option value="medium">Medium - ₹{pizza.mediumPrice}</option>
            <option value="large">Large - ₹{pizza.largePrice}</option>
          </select>

          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-select mb-2"
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>

          <div className="text-center">
            <button
              className="btn btn-outline-secondary mt-2 w-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-muted">
            <strong>Regular </strong> - ₹{pizza.regularPrice}
          </span>
          <br></br>
          <span className="text-muted">
            <strong>Medium</strong> - ₹{pizza.mediumPrice}
          </span>
          <br></br>
          <span className="text-muted">
            <strong>Large</strong> - ₹{pizza.largePrice}
          </span>
        </>
      )}
    </div>
  );
};

export default AddToCart;
