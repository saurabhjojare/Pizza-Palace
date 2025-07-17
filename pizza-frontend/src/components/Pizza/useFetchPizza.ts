import { useState, useEffect } from "react";
import {
  fetchPizzas,
  searchPizzasByName,
  deletePizza,
} from "../../services/PizzaService";
import { Pizza } from "../../interfaces/Order";
import { useDebounce } from "use-debounce";

export const useFetchPizza = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

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

  return {
    pizzas,
    error,
    searchTerm,
    setSearchTerm,
    removePizza,
  };
};
