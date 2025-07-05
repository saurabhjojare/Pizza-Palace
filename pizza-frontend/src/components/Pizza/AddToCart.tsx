import React, { useState } from "react";
import { Pizza } from "./GetPizza";
import Toppings, {
  Crust,
  Topping,
  vegToppings,
  nonVegToppings,
} from "./Toppings";

interface AddToCartProps {
  pizza: Pizza;
  addToCart: (
    pizza: Pizza,
    size: string,
    quantity: number,
    crust: Crust,
    selectedToppings: Topping[]
  ) => void;
}

const defaultCrust: Crust = { name: "Classic", price: 0 };

const AddToCart: React.FC<AddToCartProps> = ({ pizza, addToCart }) => {
  const [size, setSize] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);
  const [crust, setCrust] = useState<Crust>(defaultCrust);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleAddToCart = () => {
    addToCart(pizza, size, quantity, crust, selectedToppings);
  };

  const handleToppingChange = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.name === topping.name);
      if (exists) {
        return prev.filter((t) => t.name !== topping.name);
      } else {
        return [...prev, topping];
      }
    });
  };

  const availableToppings =
    pizza.type === "Vegetarian" ? vegToppings : nonVegToppings;

  return (
    <div>
      {/* Size dropdown with price inside each option */}
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="form-select mb-2"
      >
        <option value="regular">Regular - ${pizza.regularPrice}</option>
        <option value="medium">Medium - ${pizza.mediumPrice}</option>
        <option value="large">Large - ${pizza.largePrice}</option>
      </select>

      {/* Quantity input */}
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="form-control mb-2"
      />

      {/* Toppings checkboxes */}
      <Toppings
        availableToppings={availableToppings}
        selectedToppings={selectedToppings}
        handleToppingChange={handleToppingChange}
      />

      {/* Add to Cart */}
      <button className="btn btn-success mt-2" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
