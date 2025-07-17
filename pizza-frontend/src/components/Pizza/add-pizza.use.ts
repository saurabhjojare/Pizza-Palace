import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../utils/auth.utils";
import { Constants } from "../../enums/constants.enums";
import { addPizza } from "../../services/pizza.service";
import { Messages } from "../../enums/messages.enums";

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
