import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        role,
      });

      if (response.data.success) {
        const user_id= response.data.id;
      
        if (role === 'admin') navigate(`/admin/dashboard`);
        else if (role === 'doctor') navigate(`/doctor/dashboard/${user_id}`);
        else if (role === 'patient') navigate(`/patient/dashboard/${user_id}`);
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error or user not found');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>

        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-role-buttons">
          <button type="button" onClick={() => handleLogin('admin')}>Login as Admin</button>
          <button type="button" onClick={() => handleLogin('doctor')}>Login as Doctor</button>
          <button type="button" onClick={() => handleLogin('patient')}>Login as Patient</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
