import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login succes:', data);

      } else {
        console.error('Login Error:', data);

        navigate('/games'); 
      } 
      
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label name="email" htmlFor="emailId" aria-controls="email">
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
          <label htmlFor="passwordId" aria-controls="password">
            Password:
            <input
              type="password"
              value={password}
              id="passwordId"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Do not have an account?
        {' '}
        <Link to="/register">Sign up here</Link>
        {' '}
        {/* Enlace al registro */}
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
