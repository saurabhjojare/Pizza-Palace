import axios from "axios";
import { Order } from "../interfaces/order.interface";
import { getToken } from "../utils/auth.utils";
import { ORDER_API } from "../constants/endpoints";

export const fetchOrders = async (): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get(ORDER_API.GET_ALL, {
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
    ORDER_API.CANCEL(orderId),
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

  await axios.post(ORDER_API.PLACE, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchOrdersByCustomerId = async (
  customerId: number
): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get(ORDER_API.GET_BY_CUSTOMER_ID(customerId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const fetchOrdersByFilter = async (
  name: string,
  date: string
): Promise<Order[]> => {
  const token = getToken();
  const queryParams = new URLSearchParams();

  if (name.trim()) queryParams.append("name", name.trim());
  if (date.trim()) queryParams.append("date", date.trim());

  const response = await axios.get(ORDER_API.FILTER(queryParams.toString()), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.Data;
};

export const fetchOrdersByCustomerAndDate = async (
  customerId: number,
  date: string
): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get(
    ORDER_API.GET_BY_CUSTOMER_AND_DATE(customerId, date),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.Data;
};
