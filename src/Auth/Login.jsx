
import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h2>Hello!</h2>
        <p>Sign In to Get Started</p>

        <form className="form">
          <div className="inputGroup">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter full name" />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <button className="login-btn" onClick={() => nav("/landingPage")}>Login</button>
        </form>

        <p className="forgot">Forgot Password?</p>
      </div>
    </div>
  );
};

export default Login;
