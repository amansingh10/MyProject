import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const alreadyExists = existingUsers.find(user => user.email === formData.email);

    if (alreadyExists) {
      alert('User already exists with this email');
      return;
    }

    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    alert('Registration successful! Please login.');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already registered?{' '}
          <span onClick={() => navigate('/')}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
