import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Roles } from "../components/enums/Roles";
import { Paths } from "../components/enums/Paths";
import { Constants } from "../components/enums/Constants";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const saveToken = (token: string): void => {
  localStorage.setItem(Constants.TOKEN.toLowerCase(), token);
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload.customer_id || null;
  } catch {
    return null;
  }
};

export const getUserRoleFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload.role || null;
  } catch {
    return null;
  }
};

export const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role !== Roles.ADMIN) {
      navigate(Paths.ROOT);
    }
  }, [navigate]);
};

export const useCustomerAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role !== Roles.CUSTOMER) {
      navigate(Paths.ROOT);
    }
  }, [navigate]);
};
