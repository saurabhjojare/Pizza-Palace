// src/services/CustomerService.ts

import axios from "axios";
import { CUSTOMER_API } from "../constants/Endpoints";
import { Customer } from "../interfaces/Customer";

export const getAllCustomers = async (token: string): Promise<Customer[]> => {
  const response = await axios.get(CUSTOMER_API.GET_ALL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.Data;
};

export const deleteCustomer = async (
  customerId: number,
  token: string
): Promise<void> => {
  await axios.delete(CUSTOMER_API.DELETE(customerId), {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCustomerById = async (
  customerId: number,
  token: string
): Promise<Customer> => {
  const response = await axios.get(CUSTOMER_API.GET_BY_ID(customerId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.Data;
};

export const updateCustomerProfile = async (
  customer: Partial<Customer>,
  token: string
): Promise<Customer> => {
  if (!customer.customer_id) {
    throw new Error("Customer ID is required.");
  }

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
};

export const getCustomersByRole = async (
  role: string,
  token: string
): Promise<Customer[]> => {
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
};

export const getCustomerNameById = async (
  customerId: number,
  token: string
): Promise<string> => {
  const response = await axios.get(CUSTOMER_API.GET_NAME_BY_ID(customerId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.Data.fullName.split(" ")[0];
};
