import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "./Validation";
import "./Pizza.css";

const UpdatePizza: React.FC = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const navigate = useNavigate();

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

  // Role check using JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const role = payload.role;

      if (role !== "admin") {
        navigate("/");
      }
    } catch (e) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Update Pizza";
  }, []);

  useEffect(() => {
    if (!pizzaId) return;

    const fetchPizza = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/v1/pizzas/${pizzaId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const pizza = response.data.Data;
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

    fetchPizza();
  }, [pizzaId]);

  return (
    <div className="container container-with-navbar">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h3 className="mb-2 text-center">Update Pizza</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const token = localStorage.getItem("token");
                const response = await axios.patch(
                  `http://localhost:5000/api/v1/pizzas/${pizzaId}`,
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (response.data.Success) {
                  setSuccess("Pizza updated successfully!");
                  setError(null);
                  navigate("/pizza");
                } else {
                  throw new Error(
                    response.data.Message || "Failed to update pizza"
                  );
                }
              } catch (err) {
                setError("Failed to update pizza");
                setSuccess(null);
              }
            }}
          >
            {() => (
              <Form className="needs-validation" noValidate>
                <div className="form-group mb-2">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>
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
                  <label htmlFor="imageUrl">Image URL</label>
                  <Field
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="imageUrl"
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
                <div className="form-group mb-2">
                  <label htmlFor="regularPrice">Regular Price</label>
                  <Field
                    type="text"
                    id="regularPrice"
                    name="regularPrice"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="regularPrice"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="mediumPrice">Medium Price</label>
                  <Field
                    type="text"
                    id="mediumPrice"
                    name="mediumPrice"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="mediumPrice"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="largePrice">Large Price</label>
                  <Field
                    type="text"
                    id="largePrice"
                    name="largePrice"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="largePrice"
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
