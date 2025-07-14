import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "./Validation";
import "./Pizza.css";
import { Constants } from "../enums/Constants";
import { addPizza } from "../../services/PizzaService";
import { useAdminAuth } from "../../utils/Auth";
import { Messages } from "../enums/Messages";

const AddPizza: React.FC = () => {
  useAdminAuth();

  useEffect(() => {
    document.title = Constants.ADD_PIZZA;
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await addPizza(values);
      alert(Messages.PIZZA_ADDED_SUCCESSFULLY);
    } catch (err) {
      alert(Messages.FAILED_TO_ADD_PIZZA);
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
