import React from "react";
import { CustomerListProps } from "../../interfaces/Customer";

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onDelete,
  title,
}) => {
  return (
    <div className="container mt-3">
      {/* <h3 className="text-center mb-4">{title}</h3> */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>
                  {customer.first_name} {customer.last_name}
                </td>
                <td>{customer.address}</td>
                <td>
                  Phone: {customer.phone_number}
                  <br />
                  Email: {customer.email_address}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(customer.customer_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
