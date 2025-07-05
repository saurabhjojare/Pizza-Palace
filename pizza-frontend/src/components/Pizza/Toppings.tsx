import React from "react";

export interface Topping {
  name: string;
  price: number;
}

export interface Crust {
  name: string;
  price: number;
}

export const vegToppings: Topping[] = [
  { name: "Olives", price: 1 },
  { name: "Capsicum", price: 1 },
  { name: "Mushrooms", price: 1 },
];

export const nonVegToppings: Topping[] = [
  { name: "Pepperoni", price: 1.5 },
  { name: "Chicken", price: 1.5 },
  { name: "Sausage", price: 1.5 },
];

interface ToppingsProps {
  availableToppings: Topping[];
  selectedToppings: Topping[];
  handleToppingChange: (topping: Topping) => void;
}

const Toppings: React.FC<ToppingsProps> = ({
  availableToppings,
  selectedToppings,
  handleToppingChange,
}) => {
  return (
    <div className="mb-2">
      <label className="form-label">Toppings:</label>
      {availableToppings.map((topping) => (
        <div className="form-check" key={topping.name}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`topping-${topping.name}`}
            checked={selectedToppings.some((t) => t.name === topping.name)}
            onChange={() => handleToppingChange(topping)}
          />
          <label
            className="form-check-label"
            htmlFor={`topping-${topping.name}`}
          >
            {topping.name} (+${topping.price})
          </label>
        </div>
      ))}
    </div>
  );
};

export default Toppings;
