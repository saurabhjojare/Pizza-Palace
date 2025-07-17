import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Customer } from "../../interfaces/customer.interface";
import { Roles } from "../../enums/roles.enums";
import { Messages } from "../../enums/messages.enums";
import { Constants } from "../../enums/constants.enums";
import {
  getCustomersByRole,
  deleteCustomer,
  searchCustomers,
} from "../../services/customer.service";
import {
  getToken,
  getUserRoleFromToken,
  useAdminAuth,
} from "../../utils/auth.utils";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [error, setError] = useState<string | null>(null);

  const token = getToken();
  const role = getUserRoleFromToken();

  useAdminAuth();

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
