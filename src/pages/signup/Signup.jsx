import React from 'react';
import './Signup.css';
const Signup = () => {
    return (
        <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        

        {/* Form */}
        <form className="signup-form">
          {/* Email */}
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Use 8 or more characters with a mix of letters, numbers & symbols."
          />

          {/* Repeat Password */}
          <label>Repeat Password</label>
          <input type="password" placeholder="Repeat your password" />

          {/* Submit Button */}
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="signin-text">
          Already have an account? <span className="signin-link">Sign In</span>
        </p>
      </div>
    </div>
  );
};


export default Signup;