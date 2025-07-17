import React from "react";
import { useOrderPage } from "./orders.use";
import "./orders.css";

const OrderPage: React.FC = () => {
  const {
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
  } = useOrderPage();

  return (
    <div className="container mt-3">
      <div className="container mb-4">
        <div className="row g-2 justify-content-center">
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control py-2 px-4 h4 fw-lighter my-shadow"
              placeholder="Customer Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="date"
              className="form-control py-2 px-4 h4 fw-lighter my-shadow"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />{" "}
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
        {orders.length === 0 && !error && <span></span>}

        {orders.map((order) => {
          const { date, time } = formatDate(order.order_time);
          const customer = customers.get(order.customer_id);

          return (
            <div key={order.order_id} className="col">
              <div className="card custom-shadow h-100 p-3 max-height">
                <div className="card-body overflow-auto slim-scroll max-height-card">
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
                        {pizzas.get(line.pizza_id) || " Unknown Pizza "} <br />
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
                      className="btn btn-outline-danger w-100"
                      onClick={() => {
                        if (window.confirm("Confirm?")) {
                          handleCancel(order.order_id);
                        }
                      }}
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

export default OrderPage;
