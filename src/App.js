// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  console.log(from, to);

  useEffect(() => {
    if (!amount) return;
    async function Converter() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to} `
      );
      const data = await res.json();
      console.log(data);
      setConvertedAmount(data.rates[to]);
    }
    if (from === to) return setConvertedAmount(amount);
    Converter();
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount ? ` OUTPUT ${convertedAmount} ${to}` : ""}</p>
    </div>
  );
}
