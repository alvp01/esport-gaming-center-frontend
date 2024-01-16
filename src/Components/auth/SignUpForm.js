import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/games" />;
  }

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div>
          <label htmlFor="emailId">
            Email:
            <input
              type="email"
              value={email}
              id="emailId"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="passwordId">
            Password:
            <input
              type="password"
              value={password}
              id="passwordId"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="passwordConfirmationId">
            Confirm Password:
            <input
              type="password"
              value={passwordConfirmation}
              id="passwordConfirmationId"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
