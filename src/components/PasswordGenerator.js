import React, { useState } from "react";

function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = (lower, upper, number, symbol, length) => {
    const randomFunc = {
      lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
      upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
      number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
      symbol: () =>
        "!@#$%^&*(){}[]=<>/,.".charAt(Math.floor(Math.random() * 14)),
    };
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesArr.length === 0 || !length) {
      return "";
    }

    const generatedPassword = Array.from({ length }, () => {
      const type = typesArr[Math.floor(Math.random() * typesArr.length)];
      const funcName = Object.keys(type)[0];
      return randomFunc[funcName]();
    }).join("");

    return generatedPassword;
  };

  const handleGenerate = () => {
    const length = parseInt(document.getElementById("length").value);
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    setPassword(
      generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    );
  };

  return (
    <div className="options">
      <h2>Generate here!</h2>
      <div className="result-container">
        <span id="result">{password}</span>
        <button className="btn" id="clipboard">
          📋
        </button>
      </div>
      <input
        type="number"
        id="length"
        placeholder="Password Length (4-20)"
        min="4"
        max="20"
      />
      <div className="settings">
        <label>
          <input type="checkbox" id="uppercase" /> Include Uppercase Letters
        </label>
        <label>
          <input type="checkbox" id="lowercase" /> Include Lowercase Letters
        </label>
        <label>
          <input type="checkbox" id="numbers" /> Include Numbers
        </label>
        <label>
          <input type="checkbox" id="symbols" /> Include Symbols
        </label>
      </div>
      <button className="btn btn-large" id="generate" onClick={handleGenerate}>
        Generate Password
      </button>
    </div>
  );
}

export default PasswordGenerator;
