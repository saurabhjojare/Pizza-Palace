import React from "react";
import { Customer } from "../../interfaces/Customer";

interface Props {
  customers: Customer[];
  onDelete: (customerId: number) => void;
  title: string;
}

const CustomerList: React.FC<Props> = ({ customers, onDelete, title }) => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">{title}</h2>

      <div className="row g-4">
        {customers.map((customer) => (
          <div key={customer.customer_id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 border-0 rounded-4">
              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {customer.first_name} {customer.last_name}
                </h5>
                <p className="card-text mb-2">
                  <strong>Email:</strong> {customer.email_address}
                  <br />
                  <strong>Phone:</strong> {customer.phone_number}
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this admin?"
                        )
                      ) {
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

        {customers.length === 0 && (
          <div className="d-flex justify-content-center">
            <div className="text-center">OutOfScope</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
