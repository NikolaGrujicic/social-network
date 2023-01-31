import React, { useState } from "react";

const WritePost = ({ createNewPost }) => {
  const [postText, setPostText] = useState("");
  const [emptyPostError, setEmptyPostError] = useState(false);

  const onCreatePost = async () => {
    if (postText.trim().length > 0) {
      await createNewPost(postText);
      setEmptyPostError(false);
    } else {
      setEmptyPostError(true);
    }
  };
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
        <div className="button-blue-small" onClick={() => onCreatePost()}>
          <p>Post</p>
        </div>
        {emptyPostError ? (
          <div className="write-post-error">
            <u>Post can't be empty.</u>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WritePost;
