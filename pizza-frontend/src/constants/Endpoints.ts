export const API_BASE_URL = "http://localhost:5000/api/v1";

export const CUSTOMER_API = {
  GET_ALL: `${API_BASE_URL}/customers`,
  DELETE: (id: number) => `${API_BASE_URL}/customers/${id}`,
};
