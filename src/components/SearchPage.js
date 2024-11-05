import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/SearchPage.module.css";

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
};

// const fetchGroups = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/admin/group`, {
//             headers: {
//                 'Authorization': `Bearer ${getAuthToken()}`
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching groups:', error);
//         throw error;
//     }
// };

const SearchPage = () => {
    // const [groups, setGroups] = useState([]);

    useEffect(() => {
        // const loadGroups = async () => {
        //     try {
        //         const fetchedGroups = await fetchGroups();
        //         setGroups(fetchedGroups);
        //     } catch (error) {
        //         console.error('Failed to fetch groups:', error);
        //     }
        // };

        // loadGroups();
    }, []);
    const [fullTextResults, setFullTextResults] = useState([]);
    const [fieldSearchResults, setFieldSearchResults] = useState([]);
    const [groupSearchResults, setGroupSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState("fullText"); // Default to full-text search
    const navigate = useNavigate();

    const initialValues = {
        id: "",
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
        membershipDuration: "",
        group: ""
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
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
        membershipDuration: Yup.string().oneOf(["ONE_MONTH", "THREE_MONTHS", "SIX_MONTHS", "ONE_YEAR"]),
        group: Yup.string()
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


        if (activeTab === "fullText" && values.freeText.trim() !== "") {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/customer/search/${values.freeText}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`
                    }
                });

                if (response.status === 200) {
                    const filteredResults = response.data.map((customer) => ({
                        id: customer.id,
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
                    id: values.id,
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
                        Authorization: `Bearer ${getAuthToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const filteredResults = response.data.map((customer) => ({
                        id: customer.id,
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
                        Authorization: `Bearer ${getAuthToken()}`,
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
        <div className={styles.searchPage}>
            <h2>Customer Search</h2>
            <div className={styles.tabContainer}>
                <button
                    className={activeTab === "fullText" ? styles.activeTab : ""}
                    onClick={() => handleTabChange("fullText")}
                >
                    Full Text Search
                </button>
                <button
                    className={activeTab === "fieldSearch" ? styles.activeTab : ""}
                    onClick={() => handleTabChange("fieldSearch")}
                >
                    Field Search
                </button>
                {/* <button 
                    className={activeTab === "groupSearch" ? styles.activeTab : ""} 
                    onClick={() => handleTabChange("groupSearch")}
                >
                    Group Search
                </button> */}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSearch}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        {activeTab === "fullText" && (
                            <div className={styles.formSection}>
                                <label>Free Text Search</label>
                                <Field name="freeText" type="text" placeholder="Search..." />
                                <ErrorMessage name="freeText" component="div" className={styles.errorMessage} />
                                <button type="submit" className={styles.searchButton}>Search</button>
                            </div>
                        )}

                        {activeTab === "fieldSearch" && (
                            <div className={styles.formSection}>
                                <h3>Field Search</h3>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldColumn}>
                                        <label>First Name</label>
                                        <Field name="firstName" type="text" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Last Name</label>
                                        <Field name="lastName" type="text" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Email</label>
                                        <Field name="email" type="email" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Customer Id</label>
                                        <Field name="id" type="text" />
                                    </div>
                                </div>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldColumn}>
                                        <label>Registration Date</label>
                                        <Field name="regDate" type="date" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Join Date</label>
                                        <Field name="joinDate" type="date" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Birthdate</label>
                                        <Field name="birthdate" type="date" />
                                    </div>
                                    <div className={styles.fieldColumn}>
                                        <label>Gender</label>
                                        <Field name="gender" as="select">
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className={styles.fieldRow}>
                                <div className={styles.fieldColumn}>
                                        <label>Address</label>
                                        <Field name="address" type="text" />
                                    </div>
                                </div>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldColumn}>
                                        <label>Membership Amount</label>
                                        <Field name="membershipAmount" type="text" />
                                    </div>
                                    <div className={styles.fieldColumn}>
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
                                <button type="submit" className={styles.searchButton}>Search</button>
                            </div>
                        )}

                        {/* {activeTab === "groupSearch" && (
                            <div className={styles.formSection}>
                                <label>Group</label>
                                <Field as="select" id="group" name="group">
                                    <option value="">Select a group</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="group" component="div" className={styles.errorMessage} />
                                <button type="submit" className={styles.searchButton}>Search</button>
                            </div>
                        )} */}
                    </Form>
                )}
            </Formik>

            <div className={styles.resultsSection}>
                <h3>Search Results</h3>
                {getActiveTabResults().length > 0 ? (
                    <table className={styles.resultsTable}>
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
                                            className={styles.actionButton}
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
