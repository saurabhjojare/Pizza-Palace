import React, { useState } from "react";
import { AddToCartProps } from "../../interfaces/Order";

const AddToCart: React.FC<AddToCartProps> = ({ pizza, addToCart }) => {
  const [size, setSize] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart(pizza, size, quantity);
  };

  return (
    <div>
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
    </div>
  );
};

export default AddToCart;
