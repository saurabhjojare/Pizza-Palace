import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/Customer";
import { Roles } from "../enums/Roles";
import { getToken, getUserRoleFromToken } from "../../utils/Auth";
import {
  getCustomersByRole,
  deleteCustomer,
  searchCustomers,
} from "../../services/CustomerService";
import CustomerList from "./CustomerList";
import { Messages } from "../enums/Messages";
import { Constants } from "../enums/Constants";
import { Paths } from "../enums/Paths";
import { useDebounce } from "use-debounce";

const GetCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
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
        if (debouncedSearchTerm.trim() === "") {
          const customerData = await getCustomersByRole("customer", token!);
          setCustomers(customerData);
        } else {
          const searchData = await searchCustomers(
            debouncedSearchTerm.trim(),
            token!
          );
          setCustomers(searchData);
        }
        setError(null);
      } catch {
        setError(Messages.FAILED_TO_FETCH_CUSTOMER);
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

  if (error) {
    return (
      <div className="text-center text-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center mb-4">
        <div className="col-10 col-sm-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control py-2 px-4 h4 fw-lighter"
            placeholder="Search Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow:
                "inset 0 30px 60px -12px rgba(250, 250, 250, 0.25), inset 0 18px 36px -18px rgba(180, 167, 167, 0.3)",
            }}
          />
        </div>
      </div>

      <CustomerList
        customers={customers}
        onDelete={handleDelete}
        title="Customer List"
      />
    </div>
  );
};

export default GetCustomers;
