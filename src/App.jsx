import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://api.frankfurter.dev/v1";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertAmount, setConvertAmount] = useState(null);

  useEffect(() => {
    async function getCurrencies() {
      const rsp = await fetch(`${API_URL}/latest`);
      const data = await rsp.json();
      console.log(data);
      setCurrencies(Object.keys(data.rates));
    }
    getCurrencies();
  }, []);

  async function handleConvert() {
    const result = await fetch(
      `${API_URL}/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await result.json();
    setConvertAmount(data.rates[toCurrency]);
  }
  //
  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <p className="error"></p>

        <div className="input-group">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            className="input-field"
          />

          <select
            onChange={(e) => setFromCurrency(e.target.value)}
            className="dropdown"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <span className="arrow">→</span>

          <select
            onChange={(e) => setToCurrency(e.target.value)}
            className="dropdown"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleConvert} className="convert-button">
          Convert
        </button>
        <p className="loading">Converting...</p>

        <p className="result">{convertAmount}</p>
      </div>
    </div>
  );
}

export default App;
