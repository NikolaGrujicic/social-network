import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const RightSidebar = () => {
  const [accountName, setAccountName] = useState("");
  const { account } = useWeb3React();
  const saveEnsDomain = async () => {
    const { ethereum } = window;
    if (account) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const ensDomain = await provider.lookupAddress(account);
      let accountNumber = "";
      if (account?.trim().length > 10) {
        accountNumber = account?.trim().slice(0, 9).concat("...");
      }
      setAccountName(ensDomain?.trim().length > 0 ? ensDomain : accountNumber);
    }
  };

  useEffect(() => {
    saveEnsDomain();
  }, [account]);
  return (
    <div className="transparent-card-small">
      <div>
        <div className="account-name-header">
          <p>{accountName}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
