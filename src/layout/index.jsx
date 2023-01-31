import PostsTimeline from "./PostsTimeline";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

import React from "react";

const index = () => {
  return (
    <div className="container">
      <div className="left-sidebar">
        <LeftSidebar />
      </div>
      <div className="main-body">
        <PostsTimeline />
      </div>
      <div className="right-sidebar">
        <RightSidebar />
      </div>
    </div>
  );
};

export default index;
