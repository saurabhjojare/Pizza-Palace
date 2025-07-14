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
