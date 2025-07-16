export const API_BASE_URL = "http://localhost:5000/api/v1";

export const CUSTOMER_API = {
  GET_ALL: `${API_BASE_URL}/customers`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/customers/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/customers/${id}`,
  UPDATE: (id: number) => `${API_BASE_URL}/customers/${id}`,
  BY_ROLE: `${API_BASE_URL}/customers/by-role`,
  CREATE: `${API_BASE_URL}/customers`,
  GET_NAME_BY_ID: (id: number) => `${API_BASE_URL}/customers/${id}/full-name`,
  SEARCH_CUSTOMERS: (query: string) =>
    `${API_BASE_URL}/customers/search/customers?q=${encodeURIComponent(query)}`,
  SEARCH_ADMINS: (query: string) =>
    `${API_BASE_URL}/customers/search/admins?q=${encodeURIComponent(query)}`,
};

export const PIZZA_API = {
  BASE: `${API_BASE_URL}/pizzas`,
  GET_ALL: `${API_BASE_URL}/pizzas`,
  GET_BY_ID: (id: string | number) => `${API_BASE_URL}/pizzas/${id}`,
  DELETE: (id: string | number) => `${API_BASE_URL}/pizzas/${id}`,
  UPDATE: (id: string | number) => `${API_BASE_URL}/pizzas/${id}`,
  ADD: `${API_BASE_URL}/pizzas`,
  SEARCH_BY_NAME: `${API_BASE_URL}/pizzas/search-by-name`,
};

export const ORDER_API = {
  BASE: `${API_BASE_URL}/orders`,
  GET_ALL: `${API_BASE_URL}/orders`,
  CANCEL: (orderId: number) => `${API_BASE_URL}/orders/${orderId}`,
  PLACE: `${API_BASE_URL}/orders`,
  GET_BY_CUSTOMER_ID: (customerId: number) =>
    `${API_BASE_URL}/orders/customer/${customerId}`,
  FILTER: (query: string) => `${API_BASE_URL}/orders/filter?${query}`,
};

export const AUTH_API = {
  LOGIN: "http://localhost:5000/api/v1/auth/login",
};
