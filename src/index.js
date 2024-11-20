import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React app inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
