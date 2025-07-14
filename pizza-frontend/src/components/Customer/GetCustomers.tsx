import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/Customer";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import { getAllCustomers } from "../../services/CustomerService";
import { deleteCustomer } from "../../services/CustomerService";
import CustomerList from "./CustomerList";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";
import { Paths } from "../enums/Paths";

const GetCustomers: React.FC = () => {
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
    document.title = Constants.CUSTOMER;
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getAllCustomers(token!);
        setCustomers(customerData);
      } catch {
        setError(Messages.FAILED_TO_FETCH_CUSTOMER);
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
      setError(Messages.FAILED_TO_DELETE_CUSTOMER);
    }
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
        {error}
      </div>
    );
  }

  return <CustomerList customers={customers} onDelete={handleDelete} />;
};

export default GetCustomers;
