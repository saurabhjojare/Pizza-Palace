import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "./Validation";
import "./Pizza.css";
import { Roles } from "../enums/Roles";

const AddPizza: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Pizza";

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

      if (role !== Roles.ADMIN) {
        navigate("/");
      }
    } catch (err) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/v1/pizzas", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Pizza added successfully!");
    } catch (err) {
      alert("Failed to add pizza");
    }
  };

  return (
    <div className="container container-with-navbar">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h3 className="mb-2 text-center">Add Pizza</h3>
          <Formik
            initialValues={{
              name: "",
              type: "Vegetarian",
              imageUrl: "",
              description: "",
              regularPrice: "",
              mediumPrice: "",
              largePrice: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="needs-validation" noValidate>
                <div className="mb-2">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
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

                <div className="mb-2">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    className="form-select"
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

                <div className="mb-2">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
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

                <div className="mb-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="form-control"
                    rows={3}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-2 text-danger"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="regularPrice" className="form-label">
                    Regular Price
                  </label>
                  <Field
                    type="number"
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

                <div className="mb-2">
                  <label htmlFor="mediumPrice" className="form-label">
                    Medium Price
                  </label>
                  <Field
                    type="number"
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

                <div className="mb-2">
                  <label htmlFor="largePrice" className="form-label">
                    Large Price
                  </label>
                  <Field
                    type="number"
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

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Add
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

export default AddPizza;
