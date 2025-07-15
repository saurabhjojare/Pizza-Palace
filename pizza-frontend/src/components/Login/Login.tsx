import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken, saveToken } from "../../utils/Auth";
import LoginForm from "./LoginForm";
import { loginUser } from "../../services/AuthService";
import { Paths } from "../enums/Paths";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Constants.LOGIN;

    const token = getToken();
    const role = getUserRoleFromToken();

    if (token && role) {
      if (role === Roles.ADMIN) {
        navigate(Paths.PIZZA_LIST);
      } else if (role === Roles.CUSTOMER) {
        navigate(Paths.ROOT);
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await loginUser(email, password);
      saveToken(token);

      const role = getUserRoleFromToken();

      if (role === Roles.ADMIN) {
        navigate(Paths.PIZZA_LIST);
      } else if (role === Roles.CUSTOMER) {
        navigate(Paths.ROOT);
      } else {
        navigate(Paths.ROOT);
      }
    } catch {
      setError(Messages.INVALID_EMAIL_OR_PASSWORD);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
      error={error}
    />
  );
};

export default Login;
