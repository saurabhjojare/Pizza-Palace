import React from "react";
import { SizeProps } from "../../interfaces/order.interface";

const Size: React.FC<SizeProps> = ({ size, setSize, pizza }) => {
  return (
    <div className="mb-3">
      <label htmlFor={`size-${pizza.pizza_id}`} className="form-label">
        Size
      </label>
      <select
        id={`size-${pizza.pizza_id}`}
        className="form-select"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="regular">Regular - ₹{pizza.regularPrice}</option>
        <option value="medium">Medium - ₹{pizza.mediumPrice}</option>
        <option value="large">Large - ₹{pizza.largePrice}</option>
      </select>
    </div>
  );
};

export default Size;
