import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import http from "./api/http";
import socket from "./api/socket";

const App = () => {
  const [isServerOnline, setServerOnline] = useState(false);
  const [isSocketConnected, setSocketConnected] = useState(false);

  const updateServerStatus = () => {
    http
      .getServerStatus()
      .then((res) => {
        setServerOnline(true);
      })
      .catch((err) => {
        setServerOnline(false);
      });
  };

  const updateSocketStatus = () => {
    setSocketConnected(socket.isConnected());
  };

  const toggleSocketConnection = () => {
    if (socket.isConnected()) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  const requestSocket = () => {
    socket.request();
  };

  const abortRequestSocket = () => {
    socket.abort();
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
        <button onClick={abortRequestSocket}>abort processing</button>
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
