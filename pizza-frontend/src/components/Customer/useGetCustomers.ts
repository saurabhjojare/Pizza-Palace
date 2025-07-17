import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Customer } from "../../interfaces/Customer";
import { Roles } from "../enums/Roles";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";
import { Paths } from "../enums/Paths";
import {
  getCustomersByRole,
  deleteCustomer,
  searchCustomers,
} from "../../services/CustomerService";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";

export const useGetCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = getToken();
  const role = getUserRoleFromToken();

  useEffect(() => {
    if (!token || role !== Roles.ADMIN) {
      navigate(Paths.ROOT);
    }
  }, [token, role, navigate]);

  useEffect(() => {
    document.title = Constants.CUSTOMERS;
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (debouncedSearchTerm.trim() === "") {
          const data = await getCustomersByRole("customer", token!);
          setCustomers(data);
        } else {
          const data = await searchCustomers(
            debouncedSearchTerm.trim(),
            token!
          );
          setCustomers(data);
        }
        setError(null);
      } catch {
        return null;
      }
    };

    if (token && role === Roles.ADMIN) {
      fetchCustomers();
    }
  }, [debouncedSearchTerm, token, role]);

  const handleDelete = async (customerId: number) => {
    try {
      await deleteCustomer(customerId, token!);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== customerId));
    } catch {
      setError(Messages.FAILED_TO_DELETE_CUSTOMER);
    }
  };

  return {
    customers,
    error,
    searchTerm,
    setSearchTerm,
    handleDelete,
  };
};
