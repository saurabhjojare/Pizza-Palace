import { useEffect, useState } from "react";
import {
  getCustomerById,
  updateCustomerProfile,
} from "../../services/customer.service";
import { getToken, getUserIdFromToken } from "../../utils/auth.utils";
import { Customer } from "../../interfaces/customer.interface";
import { useNavigate } from "react-router-dom";

export const useUpdateUserProfile = () => {
  const [customer, setCustomer] = useState<Partial<Customer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomer = async () => {
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

    loadCustomer();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setError("Unauthorized.");
      return;
    }

    try {
      await updateCustomerProfile(customer, token);
      navigate("/my-profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  return {
    customer,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
