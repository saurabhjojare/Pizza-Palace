// src/types/SignUpFormData.ts
import { Roles } from "../components/enums/Roles";

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  password: string;
  confirmPassword: string;
  role: Roles;
}
