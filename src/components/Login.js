import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Login.module.css'; // Import the CSS module
import logo from '../assests/fitcliff-logo.jpeg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: username,
        password: password,
      });

      if (response.status === 200 && response.data.jwtToken) {
        localStorage.setItem('jwtToken', response.data.jwtToken);
        navigate('/search');
      } else {
        setError('Login failed, please check username or password');
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
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
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
