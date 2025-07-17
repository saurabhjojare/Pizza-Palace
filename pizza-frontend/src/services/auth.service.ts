import axios from "axios";
import { AUTH_API } from "../constants/endpoints";

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axios.post(
    AUTH_API.LOGIN,
    {
      email: email.trim(),
      password: password.trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.Data.access_token;
};
