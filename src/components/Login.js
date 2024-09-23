import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assests/fitcliff-logo.jpeg";
import { useAuth } from "../config/Authconfig";
import styles from "../css/Login.module.css"; // Import the CSS module

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.jwtToken) {
        login(response.data.jwtToken);
        navigate("/search");
      } else {
        setError("Login failed, please check username or password");
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLogo}>
        <img src={logo} alt="Fitcliff Logo" />
      </div>
      <div className={styles.loginForm}>
        <h1>Welcome to Fitcliff</h1>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
