import React from "react";

const UnsuportedNetworkError = () => {
  return (
    <div className="unsuported-error-container">
      <p className="error-header">
        This app supports ETH. You are currently connected to an unsupported
        network.
      </p>
      <div className="button-blue-error-big">
        <p>Switch to Ethereum</p>
      </div>
      <p className="error-header-small">
        You may need to manually switch network via your wallet.
      </p>
    </div>
  );
};

export default UnsuportedNetworkError;
