import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken, saveToken } from "../../utils/Auth";
import { loginUser } from "../../services/AuthService";
import { Paths } from "../enums/Paths";
import { Constants } from "../enums/Constants";
import { Messages } from "../enums/Messages";

export const useLogin = () => {
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
      } else {
        navigate(Paths.ROOT);
      }
    } catch {
      setError(Messages.INVALID_EMAIL_OR_PASSWORD);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
