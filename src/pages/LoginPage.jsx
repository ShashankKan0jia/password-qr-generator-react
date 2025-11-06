// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
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
            <Link to="/register" className="btn btn-small">
              Register
            </Link>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="options">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
              placeholder="Password"
              required
            />
            <button type="submit" className="btn btn-large">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
