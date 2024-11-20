import React from "react";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="navbar-left">
          <span className="nav-brand">Password & QR Generator</span>
        </div>
        <div className="navbar-right">
          <a href="#instructions" className="nav-link">
            Instructions
          </a>
          <a href="#suggestions" className="nav-link">
            Suggestions
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
