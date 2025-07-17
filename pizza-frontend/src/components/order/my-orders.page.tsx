import React from "react";
import { useMyOrders } from "./my-orders.use";
import "./orders.css";

const MyOrders = () => {
  const {
    sortedOrders,
    pizzas,
    error,
    handleCancel,
    formatDate,
    searchDate,
    setSearchDate,
  } = useMyOrders();

  const clearDate = () => setSearchDate("");

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Orders</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6 d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Search by Date"
          />
          {searchDate && (
            <button
              className="btn btn-outline-secondary text-nowrap"
              onClick={clearDate}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {error && <span></span>}

      {sortedOrders.length === 0 ? (
        <span> </span>
      ) : (
        <div className="row">
          {sortedOrders.map((order) => {
            const { date, time } = formatDate(order.order_time);

            return (
              <div className="col-md-6 mb-4" key={order.order_id}>
                <div className="card custom-shadow h-100 max-height px-4 py-3">
                  <div className="card-body overflow-auto fixed-height-card">
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
                        onClick={() => {
                          if (window.confirm("Confirm?")) {
                            handleCancel(order.order_id);
                          }
                        }}
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
