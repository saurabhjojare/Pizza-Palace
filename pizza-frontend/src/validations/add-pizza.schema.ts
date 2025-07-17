import * as Yup from "yup";
import { PizzaFormValues } from "../interfaces/pizza.interface";

export const AddPizzaSchema: Yup.ObjectSchema<PizzaFormValues> = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters")
    .matches(/^[^\d]*$/, "Name should not contain numeric values")
    .required("Name is required"),
  type: Yup.string()
    .oneOf(["Vegetarian", "Non-Vegetarian"], "Invalid type")
    .required("Type is required"),
  imageUrl: Yup.string().url("Invalid URL"),
  description: Yup.string().max(
    100,
    "Description should not exceed 60 characters"
  ),
  regularPrice: Yup.number()
    .typeError("Regular price must be a number")
    .positive("Regular price must be a positive number")
    .integer("Regular price must be an integer")
    .min(1, "Regular price must be at least 1")
    .max(9999, "Regular price cannot exceed 4 digits")
    .required("Regular price is required"),
  mediumPrice: Yup.number()
    .typeError("Medium price must be a number")
    .positive("Medium price must be a positive number")
    .integer("Medium price must be an integer")
    .min(1, "Medium price must be at least 1")
    .max(9999, "Medium price cannot exceed 4 digits")
    .required("Medium price is required"),
  largePrice: Yup.number()
    .typeError("Large price must be a number")
    .positive("Large price must be a positive number")
    .integer("Large price must be an integer")
    .min(1, "Large price must be at least 1")
    .max(9999, "Large price cannot exceed 4 digits")
    .required("Large price is required"),
});
