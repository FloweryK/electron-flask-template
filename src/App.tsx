import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import httpAPI from "./apis/httpAPI";
import socketAPI from "./apis/socketAPI";

const App = () => {
  const [isServerOnline, setServerOnline] = useState(false);
  const [isSocketConnected, setSocketConnected] = useState(false);

  const updateServerStatus = () => {
    httpAPI
      .getServerStatus()
      .then((res) => {
        setServerOnline(true);
      })
      .catch((err) => {
        setServerOnline(false);
      });
  };

  const updateSocketStatus = () => {
    setSocketConnected(socketAPI.isConnected());
  };

  const toggleSocketConnection = () => {
    if (socketAPI.isConnected()) {
      socketAPI.disconnect();
    } else {
      socketAPI.connect();
    }
  };

  const requestSocket = () => {
    socketAPI.request();
  };

  useEffect(() => {
    // update server status every 1 second
    updateServerStatus();
    setInterval(updateServerStatus, 1000);

    // update socket status every 1 second
    updateSocketStatus();
    setInterval(updateSocketStatus, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>server status: {isServerOnline ? "online" : "offline"}</p>
        <p>socket status: {isSocketConnected ? "online" : "offline"}</p>
        <button onClick={toggleSocketConnection}>
          {isSocketConnected ? "disconnect socket" : "connect socket"}
        </button>
        <button onClick={requestSocket}>request socket</button>
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
