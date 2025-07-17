import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, searchPizzasByName } from "../../services/PizzaService";
import {
  useCustomerAuth,
  getUserIdFromToken,
  getUserRoleFromToken,
  getToken,
} from "../../utils/Auth";
import { Pizza } from "../../interfaces/Order";
import { Roles } from "../enums/Roles";
import { Paths } from "../enums/Paths";
import { getCustomerNameById } from "../../services/CustomerService";
import { useDebounce } from "use-debounce";
import { useCart } from "../../context/CartContext";

export const useGetPizza = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const navigate = useNavigate();
  useCustomerAuth();

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  useEffect(() => {
    document.title = "Pizza Palace";

    const userId = getUserIdFromToken();
    const role = getUserRoleFromToken();
    const token = getToken();

    if (!userId || !token) {
      setFirstName(null);
      setCustomerId(null);
      navigate(Paths.ROOT);
    } else if (role === Roles.ADMIN) {
      navigate(Paths.PIZZA_LIST);
    } else {
      setCustomerId(Number(userId));
      const fetchFirstName = async () => {
        try {
          const name = await getCustomerNameById(Number(userId), token);
          setFirstName(name);
        } catch {
          setFirstName(null);
        }
      };
      fetchFirstName();
    }
  }, [navigate]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      if (!token) {
        setFirstName(null);
        setCustomerId(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    pizzas,
    error,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    customerId,
    firstName,
    searchTerm,
    setSearchTerm,
  };
};
