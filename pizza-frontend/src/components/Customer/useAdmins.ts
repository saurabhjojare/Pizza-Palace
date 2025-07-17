import { useEffect, useState } from "react";
import { Customer } from "../../interfaces/Customer";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken, useAdminAuth } from "../../utils/Auth";
import {
  getCustomersByRole,
  deleteCustomer,
  searchAdmins,
} from "../../services/CustomerService";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";
import { useDebounce } from "use-debounce";

export const useAdmins = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const token = getToken();
  const role = getUserRoleFromToken();

  useAdminAuth();

  useEffect(() => {
    document.title = Constants.ADMINS;
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (debouncedSearchTerm.trim() === "") {
          const customerData = await getCustomersByRole("admin", token!);
          setCustomers(customerData);
        } else {
          const searchData = await searchAdmins(
            debouncedSearchTerm.trim(),
            token!
          );

          setCustomers(searchData);
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
      setError(Messages.FAILED_TO_DELETE_ADMIN);
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
