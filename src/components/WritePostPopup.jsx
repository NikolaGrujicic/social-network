import React, { useEffect, useState } from "react";
import { useSocialNetworkStore } from "../store/SocialNetworkStore";
import { createPost } from "../service/SocialNetworkService";

const WritePostPopup = () => {
  const setShowWritePostPopup = useSocialNetworkStore(
    (state) => state.setShowWritePostPopup
  );
  const setFetchPostsAgain = useSocialNetworkStore(
    (state) => state.setFetchPostsAgain
  );

  const [emptyPostError, setEmptyPostError] = useState(false);
  const [postText, setPostText] = useState("");

  const onCreatePost = async () => {
    if (postText.trim().length > 0) {
      await createPost(postText);
      setFetchPostsAgain();
      setEmptyPostError(false);
    } else {
      setEmptyPostError(true);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-border">
        <div
          className="popup-close"
          onClick={() => setShowWritePostPopup(false)}
        >
          x
        </div>
        <div className="popup-write-post-image" />
        <textarea
          className="popup-textarea"
          placeholder="How’s your Vibe today, 3327?"
          onChange={(event) => setPostText(event.target.value)}
        />
        <div className="popup-button" onClick={() => onCreatePost()}>
          <p className="popup-write-post-button-text">Post</p>
        </div>
        {emptyPostError ? (
          <div className="popup-error">
            <u>Post can't be empty.</u>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WritePostPopup;
