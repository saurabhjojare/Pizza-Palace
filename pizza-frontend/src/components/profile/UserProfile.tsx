import React, { useEffect, useState } from "react";
import {
  getCustomerById,
  deleteCustomer,
} from "../../services/CustomerService";
import { getToken, getUserIdFromToken } from "../../utils/Auth";
import { Customer } from "../../interfaces/Customer";
import { useNavigate } from "react-router-dom";
import { Constants } from "../enums/Constants";

const UserProfile: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Constants.MY_PROFILE;
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = getToken();
      const userId = getUserIdFromToken();

      if (!token || !userId) {
        setError("Unauthorized access.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCustomerById(Number(userId), token);
        setCustomer(data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleDelete = async () => {
    if (!customer) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    try {
      const token = getToken();
      if (!token) {
        setError("Unauthorized.");
        return;
      }

      await deleteCustomer(customer.customer_id, token);
      alert("Profile deleted successfully.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to delete profile.");
    }
  };

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container d-flex justify-content-center mt-2">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="text-center mb-1">
          <i className="bi bi-person-circle fs-1"></i>

          <h3 className="fw-bold mb-0">
            {customer?.first_name} {customer?.last_name}
          </h3>
          <div className="text-muted text-capitalize">
            {(customer as any)?.role}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-muted small mb-1">Email</label>
          <div className="form-control bg-light border-0 shadow-sm">
            {customer?.email_address}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-muted small mb-1">Phone</label>
          <div className="form-control bg-light border-0 shadow-sm">
            {customer?.phone_number}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-muted small mb-1">Address</label>
          <div className="form-control bg-light border-0 shadow-sm">
            {customer?.address}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-primary px-4" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn btn-outline-danger px-4"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
