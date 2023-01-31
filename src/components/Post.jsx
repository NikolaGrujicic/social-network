import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSocialNetworkStore } from "../store/SocialNetworkStore";

const Post = ({ ownerAddress, text, id }) => {
  const setShowDonatePopup = useSocialNetworkStore(
    (state) => state.setShowDonatePopup
  );

  const setDonationPostId = useSocialNetworkStore(
    (state) => state.setDonationPostId
  );

  const [accountName, setAccountName] = useState("");

  const saveEnsDomain = async () => {
    const { ethereum } = window;
    if (ownerAddress) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const ensDomain = await provider.lookupAddress(ownerAddress);
      setAccountName(ensDomain?.trim().length > 0 ? ensDomain : ownerAddress);
    }
  };

  const showPopup = () => {
    setShowDonatePopup(true);
    setDonationPostId(id);
  };

  useEffect(() => {
    saveEnsDomain();
  }, []);

  return (
    <div className="timeline-feed-post-card">
      <div className="post-container">
        <div className="post-image" />
        <div className="post-header">{accountName}</div>
        <div className="post-dots" />
        <div className="post-text">{text}</div>
        <div className="post-coins-icon" onClick={() => showPopup()} />
        <div className="post-share-icon" />
      </div>
    </div>
  );
};

export default Post;
