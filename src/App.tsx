import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./apis/api";

const App = () => {
  const [serverStatus, setServerStatus] = useState("offline");

  const updateServerStatus = () => {
    api
      .getServerStatus()
      .then((res) => {
        setServerStatus("online");
      })
      .catch((err) => {
        setServerStatus("offline");
      });
  };

  useEffect(() => {
    updateServerStatus();
    setInterval(updateServerStatus, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{serverStatus}</p>
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
};

export default App;
