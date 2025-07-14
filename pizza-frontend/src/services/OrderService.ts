import axios from "axios";
import { Order } from "../interfaces/Order";
import { getToken } from "../utils/Auth";

const API_BASE_URL = "http://localhost:5000/api/v1";

export const fetchOrders = async (): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const cancelOrder = async (
  token: string,
  orderId: number
): Promise<void> => {
  await axios.patch(
    `${API_BASE_URL}/orders/${orderId}`,
    { status: false },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const placeOrder = async (
  token: string,
  customerId: number,
  deliveryAddress: string,
  cartItems: { pizza_id: number; size: string; quantity: number }[]
): Promise<void> => {
  const payload = {
    customer_id: customerId,
    delivery_address: deliveryAddress,
    status: "pending",
    orderLines: cartItems,
  };

  await axios.post(`${API_BASE_URL}/orders`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
