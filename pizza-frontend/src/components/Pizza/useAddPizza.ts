import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../utils/Auth";
import { Constants } from "../enums/Constants";
import { addPizza } from "../../services/PizzaService";
import { Messages } from "../enums/Messages";

export const useAddPizza = () => {
  useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Constants.ADD_PIZZA;
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await addPizza(values);
      navigate("/");
    } catch (err) {
      alert(Messages.FAILED_TO_ADD_PIZZA);
    }
  };

  const initialValues = {
    name: "",
    type: "Vegetarian",
    imageUrl: "",
    description: "",
    regularPrice: "",
    mediumPrice: "",
    largePrice: "",
  };

  return {
    initialValues,
    handleSubmit,
  };
};
