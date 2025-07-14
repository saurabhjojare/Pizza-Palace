import axios from "axios";

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/login",
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
