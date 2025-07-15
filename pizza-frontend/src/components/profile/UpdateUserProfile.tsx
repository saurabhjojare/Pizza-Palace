import React, { useEffect, useState } from "react";
import {
  getCustomerById,
  updateCustomerProfile,
} from "../../services/CustomerService";
import { getToken, getUserIdFromToken } from "../../utils/Auth";
import { Customer } from "../../interfaces/Customer";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile: React.FC = () => {
  const [customer, setCustomer] = useState<Partial<Customer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomer = async () => {
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

    loadCustomer();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setError("Unauthorized.");
      return;
    }

    try {
      await updateCustomerProfile(customer, token);
      navigate("/my-profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h3 className="text-center mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input
              name="first_name"
              type="text"
              className="form-control"
              value={customer.first_name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              name="last_name"
              type="text"
              className="form-control"
              value={customer.last_name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              name="email_address"
              type="email"
              className="form-control"
              value={customer.email_address || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input
              name="phone_number"
              type="text"
              className="form-control"
              value={customer.phone_number || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              name="address"
              type="text"
              className="form-control"
              value={customer.address || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button className="btn btn-success px-4" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
