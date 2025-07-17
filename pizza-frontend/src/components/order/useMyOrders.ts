import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import {
  fetchOrdersByCustomerId,
  cancelOrder,
  fetchOrdersByCustomerAndDate,
} from "../../services/OrderService";
import { fetchPizzas } from "../../services/PizzaService";
import {
  getToken,
  getUserIdFromToken,
  getUserRoleFromToken,
} from "../../utils/Auth";
import { Roles } from "../enums/Roles";
import { Paths } from "../enums/Paths";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";

export const useMyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pizzas, setPizzas] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState<string>("");
  const navigate = useNavigate();

  const token = getToken();
  const role = getUserRoleFromToken();
  const customerId = getUserIdFromToken();

  useEffect(() => {
    if (!token || role !== Roles.CUSTOMER || !customerId) {
      navigate(Paths.ROOT);
    }
  }, [token, role, customerId, navigate]);

  useEffect(() => {
    document.title = Constants.MY_ORDERS;
  }, []);

  useEffect(() => {
    const loadOrdersAndPizzas = async () => {
      try {
        const [ordersData, pizzaData] = await Promise.all([
          searchDate
            ? fetchOrdersByCustomerAndDate(Number(customerId), searchDate)
            : fetchOrdersByCustomerId(Number(customerId)),
          fetchPizzas(),
        ]);

        setOrders(ordersData);

        const pizzaMap = new Map<number, string>();
        pizzaData.forEach((pizza: { pizza_id: number; name: string }) => {
          pizzaMap.set(pizza.pizza_id, pizza.name);
        });

        setPizzas(pizzaMap);
        setError(null);
      } catch {
        setError(Messages.FAILED_TO_FETCH_ORDERS);
      }
    };

    loadOrdersAndPizzas();
  }, [customerId, searchDate]);

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

  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.order_time).getTime() - new Date(a.order_time).getTime()
  );

  return {
    sortedOrders,
    pizzas,
    error,
    handleCancel,
    formatDate,
    searchDate,
    setSearchDate,
  };
};
