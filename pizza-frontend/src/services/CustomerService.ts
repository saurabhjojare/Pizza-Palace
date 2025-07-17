import axios from "axios";
import { CUSTOMER_API } from "../constants/Endpoints";
import { Customer } from "../interfaces/Customer";

export const getAllCustomers = async (token: string): Promise<Customer[]> => {
  try {
    const response = await axios.get(CUSTOMER_API.GET_ALL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch customers."
    );
  }
};

export const deleteCustomer = async (
  customerId: number,
  token: string
): Promise<void> => {
  try {
    await axios.delete(CUSTOMER_API.DELETE(customerId), {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete customer."
    );
  }
};

export const getCustomerById = async (
  customerId: number,
  token: string
): Promise<Customer> => {
  try {
    const response = await axios.get(CUSTOMER_API.GET_BY_ID(customerId), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch customer."
    );
  }
};

export const updateCustomerProfile = async (
  customer: Partial<Customer>,
  token: string
): Promise<Customer> => {
  if (!customer.customer_id) {
    throw new Error("Customer ID is required.");
  }

  try {
    const response = await axios.patch(
      CUSTOMER_API.UPDATE(customer.customer_id),
      customer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.Data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update customer."
    );
  }
};

export const getCustomersByRole = async (
  role: string,
  token: string
): Promise<Customer[]> => {
  try {
    const response = await axios.post(
      CUSTOMER_API.BY_ROLE,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.Data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch customers by role."
    );
  }
};

export const getCustomerNameById = async (
  customerId: number,
  token: string
): Promise<string> => {
  try {
    const response = await axios.get(CUSTOMER_API.GET_NAME_BY_ID(customerId), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fullName = response.data.Data?.fullName ?? "";
    return fullName.split(" ")[0];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get customer name."
    );
  }
};

export const getCustomerAddressById = async (
  customerId: number,
  token: string
): Promise<string> => {
  try {
    const response = await axios.get(
      CUSTOMER_API.GET_ADDRESS_BY_ID(customerId),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.Data?.address ?? "";
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get customer address."
    );
  }
};

export const searchCustomers = async (
  query: string,
  token: string
): Promise<Customer[]> => {
  try {
    const response = await axios.get(CUSTOMER_API.SEARCH_CUSTOMERS(query), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Customer search failed.");
  }
};

export const searchAdmins = async (
  query: string,
  token: string
): Promise<Customer[]> => {
  try {
    const response = await axios.get(CUSTOMER_API.SEARCH_ADMINS(query), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Admin search failed.");
  }
};
