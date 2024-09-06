import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from '../css/CreateGroupForm.module.css';

const API_BASE_URL = 'http://localhost:8080';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Group name is required'),
  membershipAmount: Yup.string().required('Membership amount is required'),
  membershipDuration: Yup.string().oneOf(['ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR'], 'Invalid membership duration').required('Membership duration is required'),
  date: Yup.date().required('Date is required'), // Top-level date field
  payments: Yup.array().of(
    Yup.object({
      amount: Yup.string().required('Amount is required'),
      paymentType: Yup.string().oneOf(['CASH', 'UPI'], 'Invalid payment type').required('Payment type is required'),
      pendingAmount: Yup.string().required('Pending amount is required'),
      date: Yup.date().required('Date is required') // Date field within each payment
    })
  )
});

// Initial Values
const initialValues = {
  name: '',
  membershipAmount: '',
  membershipDuration: '',
  date: '', // Top-level date field
  payments: [{ amount: '', paymentType: '', pendingAmount: '', date: '' }] // Date field within each payment
};

const CreateGroupForm = () => {
  const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/group`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    <div className={styles.createGroupForm}>
      <h1>Create Group</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className={styles['form-row']}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Group Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <Field type="date" id="date" name="date" />
                <ErrorMessage name="date" component="div" className={styles.error} />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles.formGroup}>
                <label htmlFor="membershipAmount">Membership Amount</label>
                <Field type="text" id="membershipAmount" name="membershipAmount" />
                <ErrorMessage name="membershipAmount" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="membershipDuration">Membership Duration</label>
                <Field as="select" id="membershipDuration" name="membershipDuration">
                  <option value="">Select Membership Duration</option>
                  <option value="ONE_MONTH">ONE MONTH</option>
                  <option value="THREE_MONTHS">THREE MONTHS</option>
                  <option value="SIX_MONTHS">SIX MONTHS</option>
                  <option value="ONE_YEAR">ONE YEAR</option>
                </Field>
                <ErrorMessage name="membershipDuration" component="div" className={styles.error} />
              </div>
            </div>

            <FieldArray name="payments">
              {({ push, remove }) => (
                <div>
                  {values.payments.map((_, index) => (
                    <div key={index} className={styles.paymentGroup}>
                      <h2>Payment {index + 1}</h2>
                      <div className={styles.formGroup}>
                        <label htmlFor={`payments.${index}.amount`}>Amount</label>
                        <Field type="text" name={`payments.${index}.amount`} />
                        <ErrorMessage name={`payments.${index}.amount`} component="div" className={styles.error} />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor={`payments.${index}.paymentType`}>Payment Type</label>
                        <Field as="select" name={`payments.${index}.paymentType`}>
                          <option value="">Select Payment Type</option>
                          <option value="CASH">CASH</option>
                          <option value="UPI">UPI</option>
                        </Field>
                        <ErrorMessage name={`payments.${index}.paymentType`} component="div" className={styles.error} />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor={`payments.${index}.pendingAmount`}>Pending Amount</label>
                        <Field type="text" name={`payments.${index}.pendingAmount`} />
                        <ErrorMessage name={`payments.${index}.pendingAmount`} component="div" className={styles.error} />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor={`payments.${index}.date`}>Payment Date</label>
                        <Field type="date" name={`payments.${index}.date`} />
                        <ErrorMessage name={`payments.${index}.date`} component="div" className={styles.error} />
                      </div>
                      <button type="button" onClick={() => remove(index)} className={styles.removeButton}>Remove Payment</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ amount: '', paymentType: '', pendingAmount: '', date: '' })} className={styles.addButton}>Add Payment</button>
                </div>
              )}
            </FieldArray>

            <button type="submit" className={styles.submitButton}>Create Group</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateGroupForm;
