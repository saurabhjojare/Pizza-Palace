import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";
import { Order } from "../../interfaces/Order";
import { Paths } from "../enums/Paths";
import { fetchOrders, cancelOrder } from "../../services/OrderService";
import { Constants } from "../enums/Constants";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import { Messages } from "../enums/Messages";
import { fetchPizzas } from "../../services/PizzaService";

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pizzas, setPizzas] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const token = getToken();
  const navigate = useNavigate();

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
    document.title = Constants.ORDER;
  }, []);

  useEffect(() => {
    const loadOrdersAndPizzas = async () => {
      if (!token) return;

      try {
        const [ordersData, pizzaData] = await Promise.all([
          fetchOrders(),
          fetchPizzas(),
        ]);

        setOrders(ordersData);

        const pizzaMap = new Map<number, string>();
        pizzaData.forEach((pizza: { pizza_id: number; name: string }) => {
          pizzaMap.set(pizza.pizza_id, pizza.name);
        });

        setPizzas(pizzaMap);
      } catch {
        setError(Messages.FAILED_TO_FETCH_ORDERS);
      }
    };

    loadOrdersAndPizzas();
  }, [token]);

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
    handleCancel,
    formatDate,
  };
};
