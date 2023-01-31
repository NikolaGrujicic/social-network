import React from "react";
import { injectedConnector } from "../connectors";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { activate, deactivate } = useWeb3React();
  const navigate = useNavigate();

  async function connect() {
    try {
      await activate(injectedConnector, undefined, true);
      navigate("/social-network");
      sessionStorage.setItem("loggedIn", true);
    } catch (error) {
      console.log(error);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      sessionStorage.setItem("loggedIn", false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-page-container">
      <div>
        <div className="vibe-logo" />
        <div className="login-image-container"></div>
      </div>
      <div className="login-form-container">
        <div className="login-form-heading">Connect your wallet</div>
        <p className="login-form-paragraph">
          Need help connecting a wallet? <a target="/">Read our FAQ</a>
        </p>
        <button className="metamask-button" onClick={() => connect()}>
          <div className="login-button-container">
            <div className="metamask-logo" />
            <div className="metamask-text">Metamask</div>
          </div>
        </button>
        <button className="wallet-connect-button" onClick={() => disconnect()}>
          <div className="login-button-container">
            <div className="wallet-connect-logo" />
            <div className="wallet-connect-text">Wallet Connect</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
