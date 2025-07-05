import React from "react";
import { useLocation } from "react-router-dom";
import GetPizza from "../components/Pizza/GetPizza";
import FetchPizza from "../components/Pizza/FetchPizza";

const PizzaPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" && <GetPizza />}
      {location.pathname === "/pizza" && <FetchPizza />}
    </div>
  );
};

export default PizzaPage;
