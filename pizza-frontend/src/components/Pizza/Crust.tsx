import React from "react";
import { Crust } from "./Toppings";

interface CrustProps {
  crust: Crust;
  setCrust: (crust: Crust) => void;
  crusts: Crust[];
}

const CrustComponent: React.FC<CrustProps> = ({ crust, setCrust, crusts }) => {
  return (
    <div className="mb-3">
      <label htmlFor="crust" className="form-label">
        Crust
      </label>
      <select
        id="crust"
        className="form-select"
        value={crust.name}
        onChange={(e) =>
          setCrust(crusts.find((c) => c.name === e.target.value)!)
        }
      >
        {crusts.map((crustOption) => (
          <option key={crustOption.name} value={crustOption.name}>
            {crustOption.name} - ₹{crustOption.price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CrustComponent;
