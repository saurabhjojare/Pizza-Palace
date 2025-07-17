import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../enums/roles";
import {
  getUserRoleFromToken,
  saveToken,
  useUserAuth,
} from "../../utils/auth.utils";
import { loginUser } from "../../services/auth.service";
import { Paths } from "../../enums/paths";
import { Constants } from "../../enums/constants";
import { Messages } from "../../enums/messages";

export const useLogin = () => {
  useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Constants.LOGIN;
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
