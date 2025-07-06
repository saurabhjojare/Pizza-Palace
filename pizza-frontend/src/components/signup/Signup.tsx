import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Roles } from "../enums/Roles";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: Roles.CUSTOMER,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        const role = payload.role;

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "customer") {
          navigate("/home");
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, [navigate]);

  const handleNext = async () => {
    if (step === 1 && (!formData.firstName || !formData.lastName)) {
      setError("Please enter your first and last name.");
      return;
    }

    if (
      step === 2 &&
      (!formData.email || !formData.contact || !formData.address)
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (step === 3) {
      if (!formData.password || !formData.confirmPassword) {
        setError("Please enter and confirm your password.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/customers",
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            address: formData.address,
            phone_number: formData.contact,
            email_address: formData.email,
            password: formData.password,
            role: formData.role,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Signup success:", response.data);
        navigate("/");
      } catch (err: any) {
        console.error("Signup error:", err);
        setError(err.response?.data?.message || "Signup failed");
      } finally {
        setLoading(false);
      }

      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center pt-5">Sign Up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
          <a href="/" className="text-decoration-none">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default Signup;
