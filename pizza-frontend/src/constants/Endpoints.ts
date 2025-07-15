export const API_BASE_URL = "http://localhost:5000/api/v1";

export const CUSTOMER_API = {
  GET_ALL: `${API_BASE_URL}/customers`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/customers/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/customers/${id}`,
  UPDATE: (id: number) => `${API_BASE_URL}/customers/${id}`,
  BY_ROLE: `${API_BASE_URL}/customers/by-role`,
  GET_NAME_BY_ID: (id: number) => `${API_BASE_URL}/customers/${id}/full-name`,
};
