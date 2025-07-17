import { Roles } from "../enums/roles.enums";

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
