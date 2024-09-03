import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchPage.css";

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const SearchPage = () => {
    const [fullTextResults, setFullTextResults] = useState([]);
    const [fieldSearchResults, setFieldSearchResults] = useState([]);
    const [groupSearchResults, setGroupSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState("fullText"); // Default to full-text search
    const navigate = useNavigate();

    const initialValues = {
        freeText: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        regDate: "",
        joinDate: "",
        birthdate: "",
        address: "",
        membershipAmount: "",
        membershipDuration: ""
    };

    const validationSchema = Yup.object().shape({
        freeText: Yup.string(),
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email("Invalid email format"),
        gender: Yup.string().oneOf(["MALE", "FEMALE"]),
        regDate: Yup.date(),
        joinDate: Yup.date(),
        birthdate: Yup.date(),
        address: Yup.string(),
        membershipAmount: Yup.string(),
        membershipDuration: Yup.string().oneOf(["ONE_MONTH", "THREE_MONTHS", "SIX_MONTHS", "ONE_YEAR"])
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Clear the results when switching tabs
        if (tab === "fullText") {
            setFieldSearchResults([]);
            setGroupSearchResults([]);
        } else if (tab === "fieldSearch") {
            setFullTextResults([]);
            setGroupSearchResults([]);
        } else if (tab === "groupSearch") {
            setFullTextResults([]);
            setFieldSearchResults([]);
        }
    };

    const handleSearch = async (values) => {
        const token = localStorage.getItem("jwtToken");

        if (activeTab === "fullText" && values.freeText.trim() !== "") {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/customer/search/${values.freeText}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const filteredResults = response.data.map((customer) => ({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        gender: customer.gender,
                        regDate: customer.regDate,
                        joinDate: customer.joinDate,
                        birthdate: customer.birthdate,
                        address: customer.address,
                        membershipAmount: customer.membershipAmount,
                        membershipDuration: customer.membershipDuration
                    }));
                    setFullTextResults(filteredResults);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else if (activeTab === "fieldSearch") {
            try {
                const response = await axios.post(`${API_BASE_URL}/admin/customer/search`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    gender: values.gender,
                    regDate: values.regDate,
                    joinDate: values.joinDate,
                    birthdate: values.birthdate,
                    address: values.address,
                    membershipAmount: values.membershipAmount,
                    membershipDuration: values.membershipDuration
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const filteredResults = response.data.map((customer) => ({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        gender: customer.gender,
                        regDate: customer.regDate,
                        joinDate: customer.joinDate,
                        birthdate: customer.birthdate,
                        address: customer.address,
                        membershipAmount: customer.membershipAmount,
                        membershipDuration: customer.membershipDuration
                    }));
                    setFieldSearchResults(filteredResults);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else if (activeTab === "groupSearch") {
            try {
                const response = await axios.post(`${API_BASE_URL}/admin/customer/search`, { group: values.group }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const filteredResults = response.data.map((customer) => ({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        gender: customer.gender,
                        regDate: customer.regDate,
                        joinDate: customer.joinDate,
                        birthdate: customer.birthdate,
                        address: customer.address,
                        membershipAmount: customer.membershipAmount,
                        membershipDuration: customer.membershipDuration
                    }));
                    setGroupSearchResults(filteredResults);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
    };

    const handleSelectCustomer = (customer) => {
        navigate(`/update-customer/${customer.registrationId}`, { state: { customer } });
    };

    const getActiveTabResults = () => {
        if (activeTab === "fullText") {
            return fullTextResults;
        } else if (activeTab === "fieldSearch") {
            return fieldSearchResults;
        } else if (activeTab === "groupSearch") {
            return groupSearchResults;
        }
        return [];
    };

    return (
        <div className="search-page">
            <h2>Customer Search</h2>
            <div className="tab-container">
                <button className={activeTab === "fullText" ? "active-tab" : ""} onClick={() => handleTabChange("fullText")}>
                    Full Text Search
                </button>
                <button className={activeTab === "fieldSearch" ? "active-tab" : ""} onClick={() => handleTabChange("fieldSearch")}>
                    Field Search
                </button>
                <button className={activeTab === "groupSearch" ? "active-tab" : ""} onClick={() => handleTabChange("groupSearch")}>
                    Group Search
                </button>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSearch}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        {activeTab === "fullText" && (
                            <div className="form-section">
                                <label>Free Text Search</label>
                                <Field name="freeText" type="text" placeholder="Search..." />
                                <ErrorMessage name="freeText" component="div" className="error-message" />
                                <button type="submit" className="search-button">Search</button>
                            </div>
                        )}

                        {activeTab === "fieldSearch" && (
                            <div className="form-section">
                                <h3>Field Search</h3>
                                <div className="field-row">
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
                                        <Field name="gender" as="select">
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-column">
                                        <label>Registration Date</label>
                                        <Field name="regDate" type="date" />
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
                                        <Field name="membershipAmount" type="text" />
                                    </div>
                                    <div className="field-column">
                                        <label>Membership Duration</label>
                                        <Field name="membershipDuration" as="select">
                                            <option value="">Select</option>
                                            <option value="ONE_MONTH">One Month</option>
                                            <option value="THREE_MONTHS">Three Months</option>
                                            <option value="SIX_MONTHS">Six Months</option>
                                            <option value="ONE_YEAR">One Year</option>
                                        </Field>
                                    </div>
                                </div>
                                <button type="submit" className="search-button">Search</button>
                            </div>
                        )}

                        {activeTab === "groupSearch" && (
                            <div className="form-section">
                                <label>Group</label>
                                <Field name="group" type="text" placeholder="Enter group name" />
                                <ErrorMessage name="group" component="div" className="error-message" />
                                <button type="submit" className="search-button">Search</button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>

            <div className="results-section">
                <h3>Search Results</h3>
                {getActiveTabResults().length > 0 ? (
                    <table className="results-table">
                        <thead>
                            <tr>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getActiveTabResults().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.regDate}</td>
                                    <td>{item.joinDate}</td>
                                    <td>{item.birthdate}</td>
                                    <td>{item.address}</td>
                                    <td>{item.membershipAmount}</td>
                                    <td>{item.membershipDuration}</td>
                                    <td>
                                        <button
                                            className="action-button"
                                            onClick={() => handleSelectCustomer(item)}
                                        >
                                            Select
                                        </button>
                                    </td>
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
