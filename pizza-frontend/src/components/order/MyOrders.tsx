import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import {
  fetchOrdersByCustomerId,
  cancelOrder,
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

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pizzas, setPizzas] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
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
          fetchOrdersByCustomerId(Number(customerId)),
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
  }, [customerId]);

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

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {sortedOrders.length === 0 ? (
        <div className="alert alert-info">No orders placed yet.</div>
      ) : (
        <div className="row">
          {sortedOrders.map((order) => {
            const { date, time } = formatDate(order.order_time);

            return (
              <div className="col-md-6 mb-4" key={order.order_id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Order #{order.order_id}</h5>
                    <p className="card-text mb-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          order.status ? "text-success" : "text-danger"
                        }
                      >
                        {order.status ? "Active" : "Cancelled"}
                      </span>
                      <br />
                      <strong>Total:</strong> ₹{order.total_amount}
                      <br />
                      <strong>Address:</strong> {order.delivery_address}
                      <br />
                      <strong>Date:</strong> {date}
                      <br />
                      <strong>Time:</strong> {time}
                    </p>

                    <h6>Items:</h6>
                    <ul className="list-group mb-2">
                      {order.orderLines.map((line) => (
                        <li
                          className="list-group-item p-2"
                          key={line.orderline_id}
                        >
                          <strong>
                            {pizzas.get(line.pizza_id) || "Unknown Pizza"}
                          </strong>{" "}
                          - {line.size} - Qty: {line.quantity}
                        </li>
                      ))}
                    </ul>

                    {order.status && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(order.order_id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
