import React from "react";

interface QuantityProps {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const Quantity: React.FC<QuantityProps> = ({
  quantity,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="quantity" className="form-label">
        Quantity
      </label>
      <div className="input-group">
        {quantity > 1 && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={decrementQuantity}
          >
            -
          </button>
        )}
        <input
          type="text"
          className="form-control text-center"
          id="quantity"
          value={quantity}
          readOnly
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
