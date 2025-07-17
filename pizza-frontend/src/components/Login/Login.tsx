import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import "./Login.css";

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLogin();

  return (
    <div className="container mt-5 max-width">
      <h2 className="mb-4 text-center pt-5">Login</h2>
      <form onSubmit={handleLogin}>
        {error && <span className="text-center text-danger">{error}</span>}

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
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

export default Login;
