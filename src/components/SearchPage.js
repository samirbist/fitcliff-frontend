// SearchPage.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SearchPage.css";

// Mock data for search results (Replace with actual API data)
const mockData = [
    {
        registrationId: "001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        gender: "Male",
        registrationDate: "2024-01-15",
        joinDate: "2024-02-01",
        birthdate: "1990-01-01",
        address: "123 Main St, Cityville",
        membershipAmount: "200",
        membershipDuration: "12",
    },
    // Add more mock data as needed
];

const SearchPage = () => {
    const [results, setResults] = useState([]);

    const initialValues = {
        freeText: "",
        registrationId: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        registrationDate: "",
        joinDate: "",
        birthdate: "",
        address: "",
        membershipAmount: "",
        membershipDuration: "",
    };

    const validationSchema = Yup.object().shape({
        freeText: Yup.string(),
        registrationId: Yup.string(),
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email("Invalid email format"),
        gender: Yup.string(),
        registrationDate: Yup.date(),
        joinDate: Yup.date(),
        birthdate: Yup.date(),
        address: Yup.string(),
        membershipAmount: Yup.number(),
        membershipDuration: Yup.number(),
    });

    const handleSearch = (values) => {
        // Implement your search logic here (API calls or filtering mock data)
        // For demonstration, we're filtering the mock data
        const filteredResults = mockData.filter((item) =>
            Object.keys(values).some(
                (key) =>
                    values[key] &&
                    item[key].toString().toLowerCase().includes(values[key].toString().toLowerCase())
            )
        );
        setResults(filteredResults);
    };

    return (
        <div className="search-page">
            <h2>Customer Search</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSearch}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <label>Free Text Search</label>
                            <Field name="freeText" type="text" placeholder="Search..." />
                            <ErrorMessage name="freeText" component="div" className="error-message" />
                        </div>
                        <div className="form-section">
                            <h3>Field Search</h3>
                            <div className="field-row">
                                <div className="field-column">
                                    <label>Registration ID</label>
                                    <Field name="registrationId" type="text" />
                                </div>
                                <div className="field-column">
                                    <label>First Name</label>
                                    <Field name="firstName" type="text" />
                                </div>
                                <div className="field-column">
                                    <label>Last Name</label>
                                    <Field name="lastName" type="text" />
                                </div>
                                <div className="field-column">
                                    <label>Email</label>
                                    <Field name="email" type="email" />
                                </div>
                                <div className="field-column">
                                    <label>Gender</label>
                                    <Field name="gender" type="text" />
                                </div>
                            </div>
                            <div className="field-row">
                                <div className="field-column">
                                    <label>Registration Date</label>
                                    <Field name="registrationDate" type="date" />
                                </div>
                                <div className="field-column">
                                    <label>Join Date</label>
                                    <Field name="joinDate" type="date" />
                                </div>
                                <div className="field-column">
                                    <label>Birthdate</label>
                                    <Field name="birthdate" type="date" />
                                </div>
                                <div className="field-column">
                                    <label>Address</label>
                                    <Field name="address" type="text" />
                                </div>
                            </div>
                            <div className="field-row">
                                <div className="field-column">
                                    <label>Membership Amount</label>
                                    <Field name="membershipAmount" type="number" />
                                </div>
                                <div className="field-column">
                                    <label>Membership Duration</label>
                                    <Field name="membershipDuration" type="number" />
                                </div>
                            </div>
                            <button type="submit" className="search-button">Search</button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="results-section">
                <h3>Search Results</h3>
                {results.length > 0 ? (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Registration ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Registration Date</th>
                                <th>Join Date</th>
                                <th>Birthdate</th>
                                <th>Address</th>
                                <th>Membership Amount</th>
                                <th>Membership Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.registrationId}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.registrationDate}</td>
                                    <td>{item.joinDate}</td>
                                    <td>{item.birthdate}</td>
                                    <td>{item.address}</td>
                                    <td>{item.membershipAmount}</td>
                                    <td>{item.membershipDuration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
