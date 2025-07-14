import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";
import { Constants } from "../enums/Constants";
import { SignUpForm } from "../../interfaces/SignUp";
import { signUpUser } from "../../services/SignUpService";
import { getUserRoleFromToken } from "../../utils/Auth";
import { Paths } from "../enums/Paths";
import { Messages } from "../enums/Messages";

export const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: Roles.CUSTOMER,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = Constants.SIGN_UP;
  }, []);

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role === Roles.ADMIN) navigate(Paths.ADMIN);
    else if (role === Roles.CUSTOMER) navigate(Paths.HOME);
  }, [navigate]);

  const handleNext = async () => {
    if (step === 1 && (!formData.firstName || !formData.lastName)) {
      setError(Messages.ENTER_FIRST_AND_LAST_NAME);
      return;
    }

    if (
      step === 2 &&
      (!formData.email || !formData.contact || !formData.address)
    ) {
      setError(Messages.FILL_ALL_FIELDS);
      return;
    }

    if (step === 3) {
      if (!formData.password || !formData.confirmPassword) {
        setError(Messages.ENTER_AND_CONFIRM_PASSWORD);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError(Messages.PASSWORDS_DO_NOT_MATCH);
        return;
      }

      setLoading(true);
      setError("");

      try {
        await signUpUser(formData);
        navigate(Paths.ROOT);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    step,
    formData,
    error,
    loading,
    handleNext,
    handleBack,
    handleChange,
  };
};
