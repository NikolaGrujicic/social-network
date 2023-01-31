import React from "react";
import { useSocialNetworkStore } from "../store/SocialNetworkStore";

const LeftSidebar = () => {
  const setShowWritePostPopup = useSocialNetworkStore(
    (state) => state.setShowWritePostPopup
  );
  return (
    <div className="transparent-card-medium">
      <div>
        <div className="vibe-logo-blue" />
        <div
          className="button-blue-big"
          onClick={() => setShowWritePostPopup(true)}
        >
          <p>Write A Post</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
