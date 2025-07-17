import React from "react";
import CustomerList from "./CustomerList";
import { useGetCustomers } from "./useGetCustomers";
import "./User.css";

const GetCustomers: React.FC = () => {
  const { customers, error, searchTerm, setSearchTerm, handleDelete } =
    useGetCustomers();

  if (error) {
    return (
      <div className="text-center text-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center mb-4">
        <div className="col-10 col-sm-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control py-2 px-4 h4 fw-lighter custom-shadow"
            placeholder="Search Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <CustomerList customers={customers} onDelete={handleDelete} />
    </div>
  );
};

export default GetCustomers;
