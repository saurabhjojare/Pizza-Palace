import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import {
  fetchOrders,
  cancelOrder,
  fetchOrdersByFilter,
} from "../../services/OrderService";
import { fetchPizzas } from "../../services/PizzaService";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";
import { Paths } from "../enums/Paths";
import { Roles } from "../enums/Roles";
import { getAllCustomers } from "../../services/CustomerService";
import { Customer } from "../../interfaces/Customer";
import { useDebounce } from "use-debounce";

const OrderTable: React.FC = () => {
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
          // No matching orders — not an error, just show empty table
          setOrders([]);
          setError(null);
        } else {
          setError(Messages.FAILED_TO_FETCH_ORDERS);
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

  const reversedOrders = [...orders].reverse();

  return (
    <div className="container mt-3">
      <div className="container mb-4">
        <div className="row g-2 justify-content-center">
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control py-2 px-4 h4 fw-lighter"
              placeholder="Customer Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{
                boxShadow:
                  "inset 0 30px 60px -12px rgba(250, 250, 250, 0.25), inset 0 18px 36px -18px rgba(180, 167, 167, 0.3)",
              }}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="date"
              className="form-control py-2 px-4 h4 fw-lighter"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              style={{
                boxShadow:
                  "inset 0 30px 60px -12px rgba(250, 250, 250, 0.25), inset 0 18px 36px -18px rgba(180, 167, 167, 0.3)",
              }}
            />{" "}
          </div>
        </div>
      </div>

      {/* <h3 className="text-center mb-4">Order List</h3> */}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {reversedOrders.length === 0 && !error && (
          <div className="d-flex justify-content-center w-100">
            <div className="text-center">No orders found.</div>
          </div>
        )}

        {reversedOrders.map((order) => {
          const { date, time } = formatDate(order.order_time);
          const customer = customers.get(order.customer_id);

          return (
            <div key={order.order_id} className="col">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Order #{order.order_id}</h5>

                  <p className="mb-2">
                    <strong>Customer:</strong>
                    <br />
                    {customer ? (
                      <>
                        {customer.first_name} {customer.last_name} <br />
                        <small>Email:</small> {customer.email_address} <br />
                        <small>Phone:</small> {customer.phone_number}
                      </>
                    ) : (
                      "Unknown"
                    )}
                  </p>

                  <p className="mb-2">
                    <strong>Items:</strong>
                    <br />
                    {order.orderLines.map((line) => (
                      <div key={line.orderline_id}>
                        {pizzas.get(line.pizza_id) || " - "} <br />
                        Size: {line.size} | Quantity: {line.quantity}
                      </div>
                    ))}
                  </p>

                  <p className="mb-2">
                    <strong>Total:</strong> ₹{order.total_amount}
                  </p>

                  <p className="mb-2">
                    <strong>Order Time:</strong>
                    <br />
                    Date: {date} <br />
                    Time: {time}
                  </p>

                  <p className="mb-3">
                    <strong>Address:</strong>
                    <br />
                    {order.delivery_address}
                  </p>

                  {order.status ? (
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleCancel(order.order_id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <div className="text-muted text-center">Canceled</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTable;
