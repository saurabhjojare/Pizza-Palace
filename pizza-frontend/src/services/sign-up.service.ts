import axios from "axios";
import { SignUpForm } from "../interfaces/sign-up.interface";
import { CUSTOMER_API } from "../constants/endpoints";

export const signUpUser = async (formData: SignUpForm) => {
  try {
    const response = await axios.post(
      CUSTOMER_API.CREATE,
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        phone_number: formData.contact,
        email_address: formData.email,
        password: formData.password,
        role: formData.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign Up Failed");
  }
};
