import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useLogin();

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login(fullName, password)) {
      setError("Please enter your name and password.");
      return;
    }

    setError("");
    navigate("/landing");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Hello!</h2>
        <p>Sign In to Get Started</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="current-fullname"
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="forgot">Forgot Password?</p>
      </div>
    </div>
  );
};

export default Login;
