import React from "react";
import Navbar from "./components/Navbar";
import PasswordGenerator from "./components/PasswordGenerator";
import QRCodeGenerator from "./components/QRCodeGenerator";
import Instructions from "./components/Instructions";
import Suggestions from "./components/Suggestions";
import About from "./components/About";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-content">
        <div className="options-container">
          <PasswordGenerator />
          <QRCodeGenerator />
        </div>
        <div id="instructions">
          <Instructions />
        </div>
        <div id="suggestions">
          <Suggestions />
        </div>
        <div id="about">
          <About />
        </div>
      </div>
    </div>
  );
}

export default App;
