import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateCustomer.css";

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

// Function to get JWT token
const getAuthToken = () => {
  // Replace with the actual method to retrieve the token
  return localStorage.getItem('jwtToken');
};

// Function to upload document
const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/documentId`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data; // Return document ID or other relevant data
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// Function to upload image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data; // Return image ID or other relevant data
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Function to create a new customer
const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/customer`, customerData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

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
    profileImage: null,
    documentIdImage: null,
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
    profileImage: Yup.mixed().required("Profile image is required"),
    documentIdImage: Yup.mixed().required("Document ID image is required"),
    payments: Yup.array().of(
      Yup.object().shape({
        date: Yup.date().required("Date is required"),
        paymentAmount: Yup.number().required("Payment amount is required"),
        pendingAmount: Yup.number().required("Pending amount is required"),
        paymentType: Yup.string().required("Payment type is required"),
      })
    ),
  });

  const onSubmit = async (values) => {
    try {
      // Upload document and image
      const documentResponse = await uploadDocument(values.documentIdImage);
      const imageResponse = await uploadImage(values.profileImage);

      // Prepare customer data with IDs from document and image responses
      const customerData = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        regDate: values.regDate,
        joinDate: values.joinDate,
        birthdate: values.birthdate,
        address: values.address,
        documentId: documentResponse ? documentResponse.id : null,
        imageId: imageResponse ? imageResponse.id : null,
        payments: values.payments,
      };

      // Create customer
      await createCustomer(customerData);

      alert('Customer created successfully!');
    } catch (error) {
      alert('Failed to create customer.');
    }
  };

  return (
    <div className="create-customer-form">
      <h2>Create Customer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
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

            {/* New Fields for File Uploads */}
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={(event) => {
                  setFieldValue("profileImage", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="profileImage" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="documentIdImage">Document ID Image</label>
              <input
                type="file"
                id="documentIdImage"
                name="documentIdImage"
                onChange={(event) => {
                  setFieldValue("documentIdImage", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="documentIdImage" component="div" className="error" />
            </div>

            {/* Payment Details Section */}
            <h3>Payment Details</h3>
            <FieldArray name="payments">
              {({ remove, push }) => (
                <>
                  <div className="payments-container">
                    {values.payments.map((payment, index) => (
                      <div key={index} className="payment-form-row">
                        <div className="form-group">
                          <label htmlFor={`payments[${index}].date`}>Date</label>
                          <Field type="date" name={`payments[${index}].date`} />
                          <ErrorMessage name={`payments[${index}].date`} component="div" className="error" />
                        </div>
                        <div className="form-group">
                          <label htmlFor={`payments[${index}].paymentAmount`}>Payment Amount</label>
                          <Field type="number" name={`payments[${index}].paymentAmount`} />
                          <ErrorMessage name={`payments[${index}].paymentAmount`} component="div" className="error" />
                        </div>
                        <div className="form-group">
                          <label htmlFor={`payments[${index}].pendingAmount`}>Pending Amount</label>
                          <Field type="number" name={`payments[${index}].pendingAmount`} />
                          <ErrorMessage name={`payments[${index}].pendingAmount`} component="div" className="error" />
                        </div>
                        <div className="form-group">
                          <label htmlFor={`payments[${index}].paymentType`}>Payment Type</label>
                          <Field as="select" name={`payments[${index}].paymentType`}>
                            <option value="">Select</option>
                            <option value="CASH">CASH</option>
                            <option value="UPI">UPI</option>
                          </Field>
                          <ErrorMessage name={`payments[${index}].paymentType`} component="div" className="error" />
                        </div>
                        <div className="form-group remove-payment-btn">
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="form-group add-payment-btn">
                    <button type="button" onClick={() => push({ date: "", paymentAmount: "", pendingAmount: "", paymentType: "" })}>
                      Add Payment
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            <button type="submit" className="submit-btn">Create Customer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCustomer;
