import { useState, useEffect } from "react";
import {
  fetchPizzas,
  searchPizzasByName,
  deletePizza,
} from "../../services/pizza.service";
import { Pizza } from "../../interfaces/order.interface";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../enums/constants.enums";
import { useAdminAuth } from "../../utils/auth.utils";

export const useFetchPizza = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useAdminAuth();

  useEffect(() => {
    document.title = Constants.PIZZAS;
  }, []);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const trimmed = debouncedSearchTerm.trim();
        const pizzasData =
          trimmed === ""
            ? await fetchPizzas()
            : await searchPizzasByName(trimmed);
        setPizzas(pizzasData);
        setError(null);
      } catch {
        setError("Failed to fetch pizzas");
      }
    };

    loadPizzas();
  }, [debouncedSearchTerm]);

  const removePizza = async (pizzaId: number) => {
    try {
      await deletePizza(pizzaId);
      setPizzas((prev) => prev.filter((pizza) => pizza.pizza_id !== pizzaId));
    } catch {
      setError("Failed to delete pizza");
    }
  };

  const handleUpdateClick = (pizzaId: number) => {
    navigate(`/update-pizza/${pizzaId}`);
  };

  const handleDeleteClick = async (pizzaId: number) => {
    if (window.confirm("Confirm?")) {
      await removePizza(pizzaId);
    }
  };

  return {
    pizzas,
    error,
    searchTerm,
    setSearchTerm,
    handleUpdateClick,
    handleDeleteClick,
  };
};
