import axios from "axios";
import { getToken } from "../utils/auth.utils";
import { Pizza } from "../interfaces/order.interface";
import { PIZZA_API } from "../constants/endpoints.constants";

export const fetchPizzas = async (): Promise<Pizza[]> => {
  const token = getToken();
  const response = await axios.get(PIZZA_API.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const deletePizza = async (pizzaId: number): Promise<void> => {
  const token = getToken();
  await axios.delete(PIZZA_API.DELETE(pizzaId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPizzaById = async (pizzaId: string): Promise<Pizza> => {
  const token = getToken();
  const response = await axios.get(PIZZA_API.GET_BY_ID(pizzaId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const updatePizza = async (pizzaId: string, data: any) => {
  const token = getToken();
  const response = await axios.patch(PIZZA_API.UPDATE(pizzaId), data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addPizza = async (pizzaData: any) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token provided");

  const response = await axios.post(PIZZA_API.ADD, pizzaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const searchPizzasByName = async (name: string): Promise<Pizza[]> => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token provided");

  const response = await axios.post(
    PIZZA_API.SEARCH_BY_NAME,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.Data;
};
