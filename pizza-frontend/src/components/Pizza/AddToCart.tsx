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

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control mb-2"
          />

          <button className="btn btn-success mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
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
