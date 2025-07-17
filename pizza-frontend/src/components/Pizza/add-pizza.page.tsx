import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./pizza.css";
import { useAddPizza } from "./add-pizza.use";
import { AddPizzaSchema } from "../../validations/add-pizza.schema";

const AddPizza: React.FC = () => {
  const { initialValues, handleSubmit } = useAddPizza();

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow rounded-4 border-0">
            <div className="card-body p-4">
              <h3 className="mb-4 text-center">Add Pizza</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={AddPizzaSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="needs-validation" noValidate>
                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-4">
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

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary py-2"
                      >
                        Add Pizza
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;
