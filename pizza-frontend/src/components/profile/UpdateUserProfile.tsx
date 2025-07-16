import React, { useEffect } from "react";
import { useUpdateUserProfile } from "./useUpdateUserProfile";
import { Constants } from "../enums/Constants";

const UpdateUserProfile: React.FC = () => {
  const { customer, loading, error, handleChange, handleSubmit } =
    useUpdateUserProfile();

  useEffect(() => {
    document.title = Constants.UPDATE_PROFILE;
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-2 d-flex justify-content-center">
      <div
        className="card p-4 shadow rounded-4 border-0"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
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
            <label className="form-label">Last Name</label>
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
            <label className="form-label">Email</label>
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
            <label className="form-label">Phone</label>
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
            <label className="form-label">Address</label>
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
