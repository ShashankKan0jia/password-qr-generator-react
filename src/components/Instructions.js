import React from "react";

function Instructions() {
  return (
    <div className="instructions">
      <h2>How to Use</h2>
      <ul>
        <li>
          <strong>Generate Passwords:</strong>
          <ul>
            <li>
              Enter the desired length of the password (between 4 and 20
              characters) in the "Password Length" field.
            </li>
            <li>
              Check the boxes to include uppercase letters, lowercase letters,
              numbers, and symbols as per your preference.
            </li>
            <li>
              Click the "Generate Password" button to generate a random password
              based on your criteria.
            </li>
          </ul>
        </li>
        <li>
          <strong>Copy to Clipboard:</strong>
          <ul>
            <li>
              Click the clipboard icon next to the generated password to copy it
              to your clipboard.
            </li>
          </ul>
        </li>
        <li>
          <strong>Generate QR Code:</strong>
          <ul>
            <li>
              Generate a QR code for the generated password or any custom data.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Instructions;
