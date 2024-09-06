import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../css/CreateCustomer.module.css";

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('fileName', file.name);
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/documentId`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('fileName', file.name);
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

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

const fetchGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/group`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

const CreateCustomer = () => {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    loadGroups();
  }, []);
  
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
        amount: "",  // Changed from paymentAmount to amount
        pendingAmount: "",
        paymentType: "",
      },
    ],
    membershipDuration: "",
    membershipType: "",
    membershipAmount: "",
    group: null,
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
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
        amount: Yup.number().required("Amount is required"),  // Updated validation
        pendingAmount: Yup.number().required("Pending amount is required"),
        paymentType: Yup.string().required("Payment type is required"),
      })
    ),
    membershipDuration: Yup.string().required("Membership duration is required"),
    membershipType: Yup.string().required("Membership type is required"),
    membershipAmount: Yup.number().required("Membership amount is required")
  });

  const onSubmit = async (values) => {
    try {
      const documentResponse = await uploadDocument(values.documentIdImage);
      const imageResponse = await uploadImage(values.profileImage);

      const customerData = {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        isActive: true,
        regDate: values.regDate,
        joinDate: values.joinDate,
        birthdate: values.birthdate,
        address: values.address,
        documentImage: documentResponse ? documentResponse.id : null,
        image: imageResponse ? imageResponse.id : null,
        payments: values.payments,
        membershipDuration: values.membershipDuration,
        membershipType: values.membershipType,
        membershipAmount: values.membershipAmount,
        group: values.group ? { id: values.group } : null,
      };

      await createCustomer(customerData);

      alert('Customer created successfully!');
    } catch (error) {
      alert('Failed to create customer.');
    }
  };

  return (
    <div className={styles['create-customer-form']}>
      <h2>Create Customer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="firstname">First Name</label>
                <Field type="text" id="firstname" name="firstname" />
                <ErrorMessage name="firstname" component="div" className={styles['error']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="lastname">Last Name</label>
                <Field type="text" id="lastname" name="lastname" />
                <ErrorMessage name="lastname" component="div" className={styles['error']} />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className={styles['error']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="gender">Gender</label>
                <Field as="select" id="gender" name="gender">
                  <option value="">Select</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </Field>
                <ErrorMessage name="gender" component="div" className={styles['error']} />
              </div>
            </div>

          <div className={styles['form-group']}>
                <label htmlFor="address">Address</label>
                <Field type="text" id="address" name="address" />
                <ErrorMessage name="address" component="div" className={styles['error']} />
          </div>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="regDate">Registration Date</label>
                <Field type="date" id="regDate" name="regDate" />
                <ErrorMessage name="regDate" component="div" className={styles['error']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="joinDate">Join Date</label>
                <Field type="date" id="joinDate" name="joinDate" />
                <ErrorMessage name="joinDate" component="div" className={styles['error']} />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="birthdate">Birthdate</label>
                <Field type="date" id="birthdate" name="birthdate" />
                <ErrorMessage name="birthdate" component="div" className={styles['error']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="phone">Phone</label>
                <Field type="phone" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className={styles['error']} />
          </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="profileImage">Profile Image</label>
              <input type="file" id="profileImage" name="profileImage" onChange={(event) => setFieldValue("profileImage", event.currentTarget.files[0])} />
              <ErrorMessage name="profileImage" component="div" className={styles['error']} />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="documentIdImage">Document ID Image</label>
              <input type="file" id="documentIdImage" name="documentIdImage" onChange={(event) => setFieldValue("documentIdImage", event.currentTarget.files[0])} />
              <ErrorMessage name="documentIdImage" component="div" className={styles['error']} />
            </div>

            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="membershipDuration">Membership Duration</label>
                <Field as="select" id="membershipDuration" name="membershipDuration">
                  <option value="">Select</option>
                  <option value="ONE_MONTH">ONE MONTH</option>
                  <option value="THREE_MONTHS">THREE MONTHS</option>
                  <option value="SIX_MONTHS">SIX MONTHS</option>
                  <option value="ONE_YEAR">ONE YEAR</option>
                  </Field>
                <ErrorMessage name="membershipDuration" component="div" className={styles['error']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="membershipType">Membership Type</label>
                <Field as="select" id="membershipType" name="membershipType">
                  <option value="">Select</option>
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                  <option value="GROUP">GROUP</option>
                </Field>
                <ErrorMessage name="membershipType" component="div" className={styles['error']} />
              </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="membershipAmount">Membership Amount</label>
              <Field type="number" id="membershipAmount" name="membershipAmount" />
              <ErrorMessage name="membershipAmount" component="div" className={styles['error']} />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="group">Group</label>
              <Field as="select" id="group" name="group">
                <option value="">Select a group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </Field>
              <ErrorMessage name="group" component="div" className={styles['error']} />
            </div>

            <FieldArray name="payments">
              {({ push, remove }) => (
                <>
                  {values.payments.map((payment, index) => (
                    <div key={index} className={styles['form-row']}>
                      <div className={styles['form-group']}>
                        <label htmlFor={`payments.${index}.date`}>Payment Date</label>
                        <Field type="date" name={`payments.${index}.date`} />
                        <ErrorMessage name={`payments.${index}.date`} component="div" className={styles['error']} />
                      </div>
                      <div className={styles['form-group']}>
                        <label htmlFor={`payments.${index}.amount`}>Payment Amount</label>
                        <Field type="number" name={`payments.${index}.amount`} />
                        <ErrorMessage name={`payments.${index}.amount`} component="div" className={styles['error']} />
                      </div>
                      <div className={styles['form-group']}>
                        <label htmlFor={`payments.${index}.pendingAmount`}>Pending Amount</label>
                        <Field type="number" name={`payments.${index}.pendingAmount`} />
                        <ErrorMessage name={`payments.${index}.pendingAmount`} component="div" className={styles['error']} />
                      </div>
                      <div className={styles['form-group']}>
                        <label htmlFor={`payments.${index}.paymentType`}>Payment Type</label>
                        <Field as="select" name={`payments.${index}.paymentType`}>
                          <option value="">Select</option>
                          <option value="CASH">CASH</option>
                          <option value="UPI">UPI</option>
                        </Field>
                        <ErrorMessage name={`payments.${index}.paymentType`} component="div" className={styles['error']} />
                      </div>
                      <button type="button" className={styles['remove-payment-btn']} onClick={() => remove(index)}>Remove Payment</button>
                    </div>
                  ))}
                  <button type="button" className={styles['add-payment-btn']} onClick={() => push({ date: "", amount: "", pendingAmount: "", paymentType: "" })}>
                    Add Payment
                  </button>
                </>
              )}
            </FieldArray>
            <button type="submit" className={styles['submit-btn']}>Create Customer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCustomer;
