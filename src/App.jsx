import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://api.frankfurter.dev/v1";

function App() {
  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <p className="error"></p>

        <div className="input-group">
          <input type="number" placeholder="Amount" className="input-field" />
          <select className="dropdown">
            <option></option>
          </select>
          <span className="arrow">→</span>
          <select className="dropdown">
            <option></option>
          </select>
        </div>
        <button className="convert-button">Convert</button>
        <p className="loading">Converting...</p>

        <p className="result"></p>
      </div>
    </div>
  );
}

export default App;
