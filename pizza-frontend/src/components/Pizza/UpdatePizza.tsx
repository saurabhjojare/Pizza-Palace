import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./Pizza.css";
import { useUpdatePizza } from "./useUpdatePizza";

const UpdatePizza: React.FC = () => {
  const { initialValues, AddPizzaSchema, handleSubmit, error, success } =
    useUpdatePizza();

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card p-4 shadow rounded-4 border-0">
            <h3 className="mb-3 text-center">Update Pizza</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={AddPizzaSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form noValidate>
                  {[
                    { id: "name", label: "Name", type: "text" },
                    { id: "imageUrl", label: "Image URL", type: "text" },
                    {
                      id: "regularPrice",
                      label: "Regular Price",
                      type: "text",
                    },
                    { id: "mediumPrice", label: "Medium Price", type: "text" },
                    { id: "largePrice", label: "Large Price", type: "text" },
                  ].map(({ id, label, type }) => (
                    <div className="mb-3" key={id}>
                      <label htmlFor={id} className="form-label">
                        {label}
                      </label>
                      <Field
                        type={type}
                        id={id}
                        name={id}
                        className="form-control"
                      />
                      <ErrorMessage
                        name={id}
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <Field
                      as="select"
                      name="type"
                      id="type"
                      className="form-select"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-danger mt-1"
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
                      rows={4}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary px-4"
                    >
                      Update Pizza
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePizza;
