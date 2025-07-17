import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pizza.css";
import { useAdminAuth } from "../../utils/auth.utils";
import { getPizzaById, updatePizza } from "../../services/pizza.service";
import { AddPizzaSchema } from "../../validations/add-pizza.schema";

const defaultValues = {
  name: "",
  type: "Vegetarian",
  imageUrl: "",
  description: "",
  regularPrice: "",
  mediumPrice: "",
  largePrice: "",
};

export const useUpdatePizza = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const navigate = useNavigate();

  useAdminAuth();

  const [initialValues, setInitialValues] = useState(defaultValues);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Update Pizza";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!pizzaId) return;

      try {
        const pizza = await getPizzaById(pizzaId);
        setInitialValues({
          name: pizza.name || "",
          type: pizza.type || "Vegetarian",
          imageUrl: pizza.imageUrl || "",
          description: pizza.description || "",
          regularPrice: pizza.regularPrice || "",
          mediumPrice: pizza.mediumPrice || "",
          largePrice: pizza.largePrice || "",
        });
      } catch (err) {
        setError("Failed to load pizza data");
      }
    };

    fetchData();
  }, [pizzaId]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await updatePizza(pizzaId!, values);
      if (response.Success) {
        setSuccess("Pizza updated successfully!");
        setError(null);
        navigate("/pizza");
      } else {
        throw new Error(response.Message || "Failed to update pizza");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update pizza");
      setSuccess(null);
    }
  };

  return {
    initialValues,
    AddPizzaSchema,
    handleSubmit,
    error,
    success,
  };
};
