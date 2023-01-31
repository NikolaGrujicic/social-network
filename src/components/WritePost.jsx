import React, { useState } from "react";

const WritePost = ({ createNewPost }) => {
  const [postText, setPostText] = useState("");
  return (
    <div className="write-post-card">
      <div className="write-post-container">
        <div className="write-post-image" />
        <textarea
          className="write-post-textarea"
          rows="2"
          placeholder="How's your Vibe today, 3327?"
          onChange={(event) => setPostText(event.target.value)}
        />
        <div
          className="button-blue-small"
          onClick={() => createNewPost(postText)}
        >
          <p>Post</p>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
