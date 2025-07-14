import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "./Validation";
import "./Pizza.css";
import { useAdminAuth } from "../../utils/Auth";
import { getPizzaById, updatePizza } from "../../services/PizzaService";

const UpdatePizza: React.FC = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const navigate = useNavigate();

  useAdminAuth();

  const [initialValues, setInitialValues] = useState({
    name: "",
    type: "Vegetarian",
    imageUrl: "",
    description: "",
    regularPrice: "",
    mediumPrice: "",
    largePrice: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Update Pizza";
  }, []);

  useEffect(() => {
    if (!pizzaId) return;

    const fetchData = async () => {
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

  return (
    <div className="container container-with-navbar">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h3 className="mb-2 text-center">Update Pizza</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
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
                setError("Failed to update pizza");
                setSuccess(null);
              }
            }}
          >
            {() => (
              <Form className="needs-validation" noValidate>
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "imageUrl", label: "Image URL", type: "text" },
                  { id: "regularPrice", label: "Regular Price", type: "text" },
                  { id: "mediumPrice", label: "Medium Price", type: "text" },
                  { id: "largePrice", label: "Large Price", type: "text" },
                ].map(({ id, label, type }) => (
                  <div className="form-group mb-2" key={id}>
                    <label htmlFor={id}>{label}</label>
                    <Field
                      type={type}
                      id={id}
                      name={id}
                      className="form-control"
                    />
                    <ErrorMessage
                      name={id}
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                ))}

                <div className="form-group mb-2">
                  <label htmlFor="type">Type</label>
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    className="form-control"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdatePizza;
