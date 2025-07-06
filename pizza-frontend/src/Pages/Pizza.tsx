import React from "react";
import { useLocation } from "react-router-dom";
import FetchPizza from "../components/pizza/FetchPizza";
import GetPizza from "../components/pizza/GetPizza";

const PizzaPage: React.FC = () => {
  const location = useLocation();
  if (location.pathname === "/pizza") {
    return <FetchPizza />;
  } else if (location.pathname === "/home") {
    return <GetPizza />;
  }
  return null;
};

export default PizzaPage;
