import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://api.frankfurter.dev/v1";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function getCurrencies() {
      const rsp = await fetch(`${API_URL}/latest`);
      const data = await rsp.json();
      // console.log(data);
      setCurrencies(Object.keys(data.rates));
    }
    getCurrencies();
  }, []);

  console.log(currencies);

  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <p className="error"></p>

        <div className="input-group">
          <input
            type="number"
            placeholder="Amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="dropdown"
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="arrow">→</span>

          <select
            className="dropdown"
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
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
