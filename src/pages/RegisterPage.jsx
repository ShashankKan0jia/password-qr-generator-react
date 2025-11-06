// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <header>
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/" className="nav-brand">
              Password & QR Generator
            </Link>
          </div>
          <div className="navbar-buttons">
            <Link to="/login" className="btn btn-small">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="options">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (at least 6 characters)"
              required
            />
            <button type="submit" className="btn btn-large">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
