import React, { useEffect } from "react";
import { useUserProfile } from "./user-profile.use";
import { Constants } from "../../enums/constants";
import "./user-profile.css";

const UserProfile: React.FC = () => {
  const { customer, loading, error, handleDelete, handleUpdate } =
    useUserProfile();

  useEffect(() => {
    document.title = Constants.MY_PROFILE;
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="card px-5 pb-4 shadow rounded-4 border-0 custom-card-480">
        <div className="text-center mb-3">
          <i className="bi bi-person-circle text-secondary icon-size"></i>
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
          <button
            className="btn btn-outline-secondary px-4"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="btn btn-outline-danger px-4"
            onClick={handleDelete}
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
