import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import {
  fetchOrders,
  cancelOrder,
  fetchOrdersByFilter,
} from "../../services/OrderService";
import { fetchPizzas } from "../../services/PizzaService";
import { getToken, getUserRoleFromToken, useAdminAuth } from "../../utils/Auth";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";
import { Paths } from "../enums/Paths";
import { Roles } from "../enums/Roles";
import { getAllCustomers } from "../../services/CustomerService";
import { Customer } from "../../interfaces/Customer";
import { useDebounce } from "use-debounce";

export const useOrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pizzas, setPizzas] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Map<number, Customer>>(new Map());
  const [searchName, setSearchName] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const [debouncedName] = useDebounce(searchName, 500);
  const [debouncedDate] = useDebounce(searchDate, 500);

  const token = getToken();
  const navigate = useNavigate();
  useAdminAuth();

  useEffect(() => {
    if (!token) {
      navigate(Paths.ROOT);
      return;
    }

    const role = getUserRoleFromToken();
    if (role !== Roles.ADMIN) {
      navigate(Paths.ROOT);
    }
  }, [navigate, token]);

  useEffect(() => {
    document.title = Constants.ORDERS;
  }, []);

  useEffect(() => {
    const loadOrdersAndData = async () => {
      if (!token) return;

      try {
        const [ordersData, pizzaData, customerData] = await Promise.all([
          debouncedName.trim() || debouncedDate.trim()
            ? fetchOrdersByFilter(debouncedName, debouncedDate)
            : fetchOrders(),
          fetchPizzas(),
          getAllCustomers(token),
        ]);

        setOrders(ordersData);

        const pizzaMap = new Map<number, string>();
        pizzaData.forEach((pizza) => {
          pizzaMap.set(pizza.pizza_id, pizza.name);
        });
        setPizzas(pizzaMap);

        const customerMap = new Map<number, Customer>();
        customerData.forEach((customer) => {
          customerMap.set(customer.customer_id, customer);
        });
        setCustomers(customerMap);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setOrders([]);
          setError(null);
        } else {
          return null;
        }
      }
    };

    loadOrdersAndData();
  }, [token, debouncedName, debouncedDate]);

  const handleCancel = async (orderId: number) => {
    if (!token) return;

    try {
      await cancelOrder(token, orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: false } : order
        )
      );
    } catch {
      setError(Messages.FAILED_TO_CANCEL_ORDER);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-GB"),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return {
    orders,
    pizzas,
    error,
    customers,
    searchName,
    searchDate,
    setSearchName,
    setSearchDate,
    handleCancel,
    formatDate,
  };
};
