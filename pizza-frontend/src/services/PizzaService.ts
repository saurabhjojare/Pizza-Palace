// src/services/PizzaService.ts

import axios from "axios";
import { getToken } from "../utils/Auth";
import { Pizza } from "../interfaces/Order";

const API_BASE_URL = "http://localhost:5000/api/v1/pizzas";

export const fetchPizzas = async (): Promise<Pizza[]> => {
  const token = getToken();
  const response = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const deletePizza = async (pizzaId: number): Promise<void> => {
  const token = getToken();
  await axios.delete(`${API_BASE_URL}/${pizzaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPizzaById = async (pizzaId: string): Promise<Pizza> => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/${pizzaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Data;
};

export const updatePizza = async (pizzaId: string, data: any) => {
  const token = getToken();
  const response = await axios.patch(`${API_BASE_URL}/${pizzaId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addPizza = async (pizzaData: any) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token provided");

  const response = await axios.post(API_BASE_URL, pizzaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
