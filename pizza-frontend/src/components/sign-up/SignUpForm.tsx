import React from "react";
import { SignUp } from "./SignUp";
import { Roles } from "../enums/Roles";
import "./SignUp.css";

export const SignUpForm: React.FC = () => {
  const {
    step,
    formData,
    error,
    loading,
    handleNext,
    handleBack,
    handleChange,
  } = SignUp();

  return (
    <div className="container mt-5 max-width-500">
      <h2 className="mb-4 text-center pt-5">Sign Up</h2>

      {error && <div className="text-center text-danger">{error}</div>}

      <form>
        {step === 1 && (
          <>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                name="contact"
                type="text"
                className="form-control"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                name="address"
                type="text"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value={Roles.ADMIN}>Admin</option>
                <option value={Roles.CUSTOMER}>Customer</option>
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Re-enter Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="d-flex justify-content-between">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="btn btn-light ms-auto"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Please wait..." : step === 3 ? "Sign Up" : "Next"}
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <small>
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default SignUpForm;
