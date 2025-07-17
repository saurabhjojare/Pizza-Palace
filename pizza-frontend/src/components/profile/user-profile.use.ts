import { useEffect, useState } from "react";
import { Customer } from "../../interfaces/customer.interface";
import { useNavigate } from "react-router-dom";
import { getToken, getUserIdFromToken } from "../../utils/auth.utils";
import {
  deleteCustomer,
  getCustomerById,
} from "../../services/customer.service";
import { Paths } from "../../enums/paths.enums";

export const useUserProfile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = getToken();
      const userId = getUserIdFromToken();

      if (!token || !userId) {
        setError("Unauthorized access.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCustomerById(Number(userId), token);
        setCustomer(data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleDelete = async () => {
    if (!customer) return;

    const confirmDelete = window.confirm("Confirm?");
    if (!confirmDelete) return;

    try {
      const token = getToken();
      if (!token) {
        setError("Unauthorized.");
        return;
      }

      await deleteCustomer(customer.customer_id, token);
      localStorage.removeItem("token");

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to delete profile.");
    }
  };

  const handleUpdate = () => {
    navigate(Paths.UPDATE_PROFILE);
  };

  return {
    customer,
    loading,
    error,
    handleDelete,
    handleUpdate,
  };
};
