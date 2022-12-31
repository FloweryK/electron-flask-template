import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const HOST = "http://127.0.0.1:5000";
const OFFLINE = "offline";
const ONLINE = "online";
const UPDATE_INTERVAL = 1000;

function App() {
  const [serverStatus, setServerStatus] = useState(OFFLINE);

  const updateServerStatus = () => {
    axios
      .get(HOST)
      .then((res) => {
        setServerStatus(ONLINE);
      })
      .catch((err) => {
        setServerStatus(OFFLINE);
      });
  };

  useEffect(() => {
    setInterval(updateServerStatus, UPDATE_INTERVAL);
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
}

export default App;
