import React from "react";
import { Link } from "react-router-dom";
import { LoginFormProps } from "../../interfaces/Login";

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center pt-5">Login</h2>
      <form onSubmit={onSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-light w-100">
          Login
        </button>

        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-decoration-none">
              Sign Up
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
