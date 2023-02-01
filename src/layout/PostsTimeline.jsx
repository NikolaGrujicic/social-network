import React, { useEffect, useRef, useState } from "react";
import WritePost from "../components/WritePost";
import Post from "../components/Post";
import { useSocialNetworkStore } from "../store/SocialNetworkStore";
import pageBottomVisible from "../hooks/pageBottomVisible";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import UnsuportedNetworkError from "../components/UnsuportedNetworkError";
import {
  fetchPostsByRange,
  fetchPostsByRangeNext,
  getLatestPostID,
  createPost,
} from "../service/SocialNetworkService";
import Search from "../components/Search";

const PostsTimeline = () => {
  const { error, chainId } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const ref = useRef(null);
  const isVisible = pageBottomVisible(ref);

  const posts = useSocialNetworkStore((state) => state.posts);
  const setPosts = useSocialNetworkStore((state) => state.setPosts);
  const fetchPostsAgain = useSocialNetworkStore(
    (state) => state.fetchPostsAgain
  );

  const [numberOfPostsToFetch, setNumberOfPostsToFetch] = useState(5);
  const [numberOfPostsLeft, setNumberOfPostsLeft] = useState(0);
  const [postsBatch, setPostsBatch] = useState([]);
  const [latestPostId, setLatestPostId] = useState(0);

  const fetchPosts = async () => {
    const id = await getLatestPostID();
    if (id > 0) {
      const newPosts = await fetchPostsByRange(id, 5);
      setPostsBatch(newPosts);
      setNumberOfPostsLeft(id - 5);
      setNumberOfPostsToFetch(numberOfPostsToFetch + 5);
      setLatestPostId(id);
    }
  };

  const fetchPostsNext = async () => {
    const newPosts = await fetchPostsByRangeNext(
      latestPostId,
      numberOfPostsToFetch,
      numberOfPostsLeft
    );

    console.log("fetched!");

    setPostsBatch((postsBatch) => [...postsBatch, ...newPosts]);

    setNumberOfPostsLeft(
      latestPostId - numberOfPostsToFetch > 0
        ? latestPostId - numberOfPostsToFetch
        : 0
    );

    setNumberOfPostsToFetch(
      numberOfPostsToFetch <= latestPostId ? numberOfPostsToFetch + 5 : 0
    );
  };

  const createNewPost = async (text) => {
    await createPost(text);
    await fetchPosts();
  };

  const trackScrolling = (isVisible) => {
    if (
      isVisible &&
      posts.length > 0 &&
      numberOfPostsToFetch !== 0 &&
      numberOfPostsLeft > 0
    ) {
      fetchPostsNext();
      document.removeEventListener("scroll", trackScrolling);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling(isVisible));
    return () => document.removeEventListener("scroll", trackScrolling);
  }, [isVisible]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPostsAgain]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let postsLeft = latestPostId;
    const postsArray = postsBatch;

    if (postsLeft > 1) {
      const newPosts = postsArray.map((subArray, i) => [
        ...subArray,
        postsLeft--,
      ]);
      setPosts(newPosts);
    }
  }, [postsBatch]);

  useEffect(() => {
    if (chainId == 5) {
      fetchPosts();
    }
  }, [chainId]);

  useEffect(() => {
    if (isUnsupportedChainIdError == true) {
      setPosts([]);
    }
  }, [isUnsupportedChainIdError]);
  return (
    <div className="transparent-card-big-border">
      <div className="transparent-card-big">
        <div className="post-timeline-container">
          {isUnsupportedChainIdError ? (
            <UnsuportedNetworkError />
          ) : (
            <>
              <Search />
              <p className="post-timeline-header">Update your Vibe</p>
              <WritePost createNewPost={createNewPost} />
              <p className="post-timeline-header">Feed</p>
              {posts.map((post, i) => {
                if (post[2].trim().length > 0) {
                  return (
                    <div key={i}>
                      <Post
                        ownerAddress={post[1]}
                        text={post[2]}
                        id={post[3]}
                      />
                    </div>
                  );
                }
              })}
            </>
          )}
          <div ref={ref} />
        </div>
      </div>
    </div>
  );
};

export default PostsTimeline;
