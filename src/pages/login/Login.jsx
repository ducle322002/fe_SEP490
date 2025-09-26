import React from 'react';
import './Login.css';
const Login = () => {
    return (
        <div className="login-container">
      <div className="login-box">
        <h2 className="logo">SEP490</h2>
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Welcome to log in.
        </p>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Please enter your email" />
          <label>Password</label>
          <div className="password-wrapper">
            <input type="password" placeholder="Please enter your password" />
            <span className="eye-icon">👁️</span>
          </div>
          <button type="button" className="login-btn">LOGIN</button>
            <p className="signup-link">                
                forgot password? <a href="/reset">Reset</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Login;