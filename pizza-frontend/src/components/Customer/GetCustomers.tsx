import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email_address: string;
}

const GetCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Manual JWT decoding to get the role
  let role: string | null = null;

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      role = payload.role;
    } catch (err) {
      role = null;
    }
  }

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    document.title = "Customer's";
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomers(response.data.Data);
      } catch (err) {
        setError("Failed to fetch customer");
      }
    };

    if (role === "admin") {
      fetchCustomers();
    }
  }, [token, role]);

  const handleDelete = async (customerId: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomers(
        customers.filter((customer) => customer.customer_id !== customerId)
      );
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Customer List</h3>
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
                    onClick={() => handleDelete(customer.customer_id)}
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

export default GetCustomers;
