import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreateCustomer.css";

const CreateCustomer = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    regDate: "",
    joinDate: "",
    birthdate: "",
    address: "",
    payments: [
      {
        date: "",
        paymentAmount: "",
        pendingAmount: "",
        paymentType: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    regDate: Yup.date().required("Registration date is required"),
    joinDate: Yup.date().required("Join date is required"),
    birthdate: Yup.date().required("Birthdate is required"),
    address: Yup.string().required("Address is required"),
    payments: Yup.array().of(
      Yup.object().shape({
        date: Yup.date().required("Date is required"),
        paymentAmount: Yup.number().required("Payment amount is required"),
        pendingAmount: Yup.number().required("Pending amount is required"),
        paymentType: Yup.string().required("Payment type is required"),
      })
    ),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="create-customer-form">
      <h2>Create Customer</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Field type="text" id="firstname" name="firstname" />
                <ErrorMessage name="firstname" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Field type="text" id="lastname" name="lastname" />
                <ErrorMessage name="lastname" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <Field as="select" id="gender" name="gender">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="regDate">Registration Date</label>
                <Field type="date" id="regDate" name="regDate" />
                <ErrorMessage name="regDate" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="joinDate">Join Date</label>
                <Field type="date" id="joinDate" name="joinDate" />
                <ErrorMessage name="joinDate" component="div" className="error" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <Field type="date" id="birthdate" name="birthdate" />
              <ErrorMessage name="birthdate" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field as="textarea" id="address" name="address" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>

            {/* Payment Details Section */}
            <h3>Payment Details</h3>
            <FieldArray name="payments">
              {({ remove, push }) => (
                <>
                  {values.payments.map((payment, index) => (
                    <div key={index} className="payment-row">
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.date`}>Date</label>
                        <Field type="date" name={`payments.${index}.date`} />
                        <ErrorMessage name={`payments.${index}.date`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.paymentAmount`}>Payment Amount</label>
                        <Field type="number" name={`payments.${index}.paymentAmount`} />
                        <ErrorMessage name={`payments.${index}.paymentAmount`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.pendingAmount`}>Pending Amount</label>
                        <Field type="number" name={`payments.${index}.pendingAmount`} />
                        <ErrorMessage name={`payments.${index}.pendingAmount`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.paymentType`}>Payment Type</label>
                        <Field as="select" name={`payments.${index}.paymentType`}>
                          <option value="">Select</option>
                          <option value="credit">Credit</option>
                          <option value="debit">Debit</option>
                          <option value="cash">Cash</option>
                        </Field>
                        <ErrorMessage name={`payments.${index}.paymentType`} component="div" className="error" />
                      </div>
                      <div className="form-group remove-button">
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="add-payment-button" onClick={() => push({ date: "", paymentAmount: "", pendingAmount: "", paymentType: "" })}>
                    Add Payment
                  </button>
                </>
              )}
            </FieldArray>

            <button type="submit" className="submit-button">Create Customer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCustomer;
