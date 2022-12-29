import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [result, setResult] = useState("empty");

  const onClick = () => {
    axios
      .get("http://127.0.0.1:5000")
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        setResult(err.data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={onClick}>result: {result}</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
