import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import { fetchOrders, cancelOrder } from "../../services/OrderService";
import { fetchPizzas } from "../../services/PizzaService";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";
import { Paths } from "../enums/Paths";
import { Roles } from "../enums/Roles";

const OrderTable: React.FC = () => {
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

  const reversedOrders = [...orders].reverse();

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Order List</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Order Time</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reversedOrders.map((order) => {
              const { date, time } = formatDate(order.order_time);
              return (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.orderLines.map((line) => (
                      <div key={line.orderline_id}>
                        {pizzas.get(line.pizza_id) || " - "}
                        <br />
                        Size: {line.size}
                        <br />
                        Quantity: {line.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <div>Date: {date}</div>
                    <div>Time: {time}</div>
                  </td>
                  <td>{order.delivery_address}</td>
                  <td>
                    {order.status ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(order.order_id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-muted">Canceled</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
