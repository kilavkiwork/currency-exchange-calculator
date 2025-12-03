import { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://api.frankfurter.dev/v1";

function App() {
  const [currencies, setCurrencies] = useState(["EUR"]);
  const [fromCurrency, setFromCurrency] = useState(currencies);
  const [toCurrency, setToCurrency] = useState(currencies);
  const [amount, setAmount] = useState(1);
  const [convertAmount, setConvertAmount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoadings] = useState(false);

  useEffect(() => {
    async function getCurrencies() {
      try {
        const rsp = await fetch(`${API_URL}/latest`);
        const data = await rsp.json();
        setCurrencies([...Object.keys(data.rates), "EUR"].toSorted());
        console.log(currencies);
      } catch {
        setError("Failed to fetch currencies");
      }
    }
    getCurrencies();
  }, []);

  async function handleConvert() {
    if (!amount || amount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertAmount(1);
      return;
    }

    setError(null);
    setIsLoadings(true);

    try {
      const result = await fetch(
        `${API_URL}/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`
      );
      const data = await result.json();
      console.log(data);
      setConvertAmount(data.rates[toCurrency]);
    } catch {
      setError("Failed to convert currencies");
    } finally {
      setIsLoadings(false);
    }
  }
  //
  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        {error && <p className="error">{error}</p>}

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
        {isLoading && <p className="loading">Converting...</p>}

        {convertAmount !== null && !isLoading && (
          <p className="result">
            {amount} {fromCurrency} = {convertAmount.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
