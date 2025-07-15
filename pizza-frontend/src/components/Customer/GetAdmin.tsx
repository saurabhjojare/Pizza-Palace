import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/Customer";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import {
  getCustomersByRole,
  deleteCustomer,
} from "../../services/CustomerService";
import CustomerList from "./CustomerList";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";
import { Paths } from "../enums/Paths";

const GetAdmin: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
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
    document.title = Constants.ADMIN_LIST;
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getCustomersByRole("admin", token!);
        setCustomers(customerData);
      } catch {
        setError(Messages.FAILED_TO_FETCH_ADMIN);
      }
    };

    if (token && role === Roles.ADMIN) {
      fetchCustomers();
    }
  }, [token, role]);

  const handleDelete = async (customerId: number) => {
    try {
      await deleteCustomer(customerId, token!);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== customerId));
    } catch {
      setError(Messages.FAILED_TO_DELETE_ADMIN);
    }
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <CustomerList
      customers={customers}
      onDelete={handleDelete}
      title="Admin List"
    />
  );
};

export default GetAdmin;
