import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./PaymentModal.css";

const PaymentModal = ({ onClose }) => {
  const initialValues = {
    date: "",
    paymentAmount: "",
    pendingAmount: "",
    paymentType: "",
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    paymentAmount: Yup.number().required("Payment amount is required"),
    pendingAmount: Yup.number().required("Pending amount is required"),
    paymentType: Yup.string().required("Payment type is required"),
  });

  const onSubmit = (values) => {
    console.log("Payment data", values);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Payment</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <Field type="date" id="date" name="date" />
                <ErrorMessage name="date" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="paymentAmount">Payment Amount</label>
                <Field type="number" id="paymentAmount" name="paymentAmount" />
                <ErrorMessage name="paymentAmount" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="pendingAmount">Pending Amount</label>
                <Field type="number" id="pendingAmount" name="pendingAmount" />
                <ErrorMessage name="pendingAmount" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="paymentType">Payment Type</label>
                <Field as="select" id="paymentType" name="paymentType">
                  <option value="">Select</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                  <option value="cash">Cash</option>
                </Field>
                <ErrorMessage name="paymentType" component="div" className="error" />
              </div>
              <div className="modal-buttons">
                <button type="submit">Submit Payment</button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentModal;
