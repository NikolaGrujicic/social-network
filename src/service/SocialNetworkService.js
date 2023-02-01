import { ethers } from "ethers";
import abi from "../web3/SocialNetworkABI.json";

const { ethereum } = window;

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractABI = abi;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const socialNetwork = new ethers.Contract(contractAddress, contractABI, signer);

export const fetchPostsByRange = async (latestPostId, numberOfPostsToFetch) => {
  try {
    const newPosts = await socialNetwork.fetchPostsRanged(
      latestPostId - 4,
      numberOfPostsToFetch
    );

    console.log("fetched!");

    let reversedPosts = [];
    newPosts.forEach((post) => {
      reversedPosts.unshift(post);
    });

    return reversedPosts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsByRangeNext = async (
  latestPostId,
  numberOfPostsToFetch,
  numberOfPostsLeft
) => {
  try {
    if (latestPostId - numberOfPostsToFetch > 0) {
      const newPosts = await socialNetwork.fetchPostsRanged(
        latestPostId - numberOfPostsToFetch + 1,
        5
      );

      console.log("fetched!");

      let reversedPosts = [];
      newPosts.forEach((post) => {
        reversedPosts.unshift(post);
      });

      return reversedPosts;
    } else if (numberOfPostsLeft > 0) {
      const newPosts = await socialNetwork.fetchPostsRanged(
        0,
        numberOfPostsLeft + 1
      );

      console.log("fetched!");

      let reversedPosts = [];
      newPosts.forEach((post) => {
        reversedPosts.unshift(post);
      });

      return reversedPosts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (newPost) => {
  try {
    console.log("creating a new post..");
    const postTransaction = await socialNetwork.createPost(newPost);

    await postTransaction.wait();

    console.log("Post created!");
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (id) => {
  try {
    console.log("fetching post by id..");
    const post = await socialNetwork.getPost(id);
    console.log("fetched!");
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const sponsorPost = async (id, amount) => {
  try {
    console.log("sponsoring a post..");
    const sponsorPostTransaction = await socialNetwork.sponsorPost(id, {
      value: ethers.utils.parseEther(amount),
    });

    await sponsorPostTransaction.wait();

    console.log("The post has been sponsored!");
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPostID = async () => {
  try {
    const latestPostIdResult = await socialNetwork.getLatestPostID();
    return latestPostIdResult.toNumber();
  } catch (error) {
    console.log(error);
  }
};
