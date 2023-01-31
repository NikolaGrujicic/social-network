import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import ConnectionProvider from "./web3/ConnectionProvider";

function getLibrary(provider, connector) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ConnectionProvider>
      <Router>
        <App />
      </Router>
    </ConnectionProvider>
  </Web3ReactProvider>
);
