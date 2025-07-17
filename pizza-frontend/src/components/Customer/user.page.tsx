import React from "react";
import { CustomerListProps } from "../../interfaces/customer.interface";

const UserPage: React.FC<CustomerListProps> = ({ customers, onDelete }) => {
  return (
    <div className="container">
      <div className="row g-4">
        {customers.map((customer) => (
          <div key={customer.customer_id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 border-0 rounded-4 p-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {customer.first_name} {customer.last_name}
                </h5>
                <p className="card-text ">
                  <strong>Email:</strong> {customer.email_address}
                  <br />
                  <strong>Phone:</strong> {customer.phone_number}
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-danger mt-4 px-4 w-100"
                    onClick={() => {
                      if (window.confirm("Confirm?")) {
                        onDelete(customer.customer_id);
                      }
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {customers.length === 0 && <span></span>}
      </div>
    </div>
  );
};

export default UserPage;
