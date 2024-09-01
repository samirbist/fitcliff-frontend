import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './CreateGroupForm.css';

const API_BASE_URL = 'http://localhost:8080';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Group name is required'),
  payments: Yup.array().of(
    Yup.object({
      amount: Yup.string().required('Amount is required'),
      paymentType: Yup.string().oneOf(['CASH', 'UPI'], 'Invalid payment type').required('Payment type is required'),
      pendingAmount: Yup.string().required('Pending amount is required'), // Validation for pending amount
      date: Yup.date().required('Date is required'), // Added validation for date
    })
  )
});

// Initial Values
const initialValues = {
  name: '',
  payments: [{ amount: '', paymentType: '', pendingAmount: '', date: '' }] // Added date field
};

const CreateGroupForm = () => {
  const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/group`, values, { // Fixed the URL string interpolation
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include Authorization header
        }
      });
      console.log('Group created:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error creating group:', error.response ? error.response.data : error.message);
      // Handle error response
    }
  };

  return (
    <div className="create-group-form">
      <h1>Create Group</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Group Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <FieldArray name="payments">
              {({ push, remove }) => (
                <div>
                  {values.payments.map((_, index) => (
                    <div key={index} className="payment-group">
                      <h2>Payment {index + 1}</h2>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.amount`}>Amount</label>
                        <Field type="text" name={`payments.${index}.amount`} />
                        <ErrorMessage name={`payments.${index}.amount`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.paymentType`}>Payment Type</label>
                        <Field as="select" name={`payments.${index}.paymentType`}>
                          <option value="">Select Payment Type</option>
                          <option value="CASH">CASH</option>
                          <option value="UPI">UPI</option>
                        </Field>
                        <ErrorMessage name={`payments.${index}.paymentType`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.pendingAmount`}>Pending Amount</label>
                        <Field type="text" name={`payments.${index}.pendingAmount`} />
                        <ErrorMessage name={`payments.${index}.pendingAmount`} component="div" className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`payments.${index}.date`}>Date</label>
                        <Field type="date" name={`payments.${index}.date`} />
                        <ErrorMessage name={`payments.${index}.date`} component="div" className="error" />
                      </div>
                      <button type="button" onClick={() => remove(index)} className="remove-button">Remove Payment</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ amount: '', paymentType: '', pendingAmount: '', date: '' })} className="add-button">Add Payment</button>
                </div>
              )}
            </FieldArray>

            <button type="submit" className="submit-button">Create Group</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateGroupForm;
