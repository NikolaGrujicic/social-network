import { create } from "zustand";

export const useSocialNetworkStore = create((set) => ({
  posts: [],
  postsBatch: [],
  latestPostId: 0,
  donationPostId: 0,
  numberOfPostsToFetch: 10,
  numberOfPostsLeft: 0,
  showSponsorPostPopup: false,
  showWritePostPopup: false,
  fetchPostsAgain: false,
  setPosts: (posts) => set(() => ({ posts: posts })),
  setFetchPostsAgain: () =>
    set((state) => ({ fetchPostsAgain: !state.fetchPostsAgain })),
  addToPostsBatch: (posts) =>
    set((state) => ({ postsBatch: state.postsBatch.concat(posts) })),
  setNumberOfPostsLeft: (number) => set(() => ({ numberOfPostsLeft: number })),
  setNumberOfPostsToFetch: (number) =>
    set(() => ({ numberOfPostsToFetch: number })),
  setDonationPostId: (id) => set(() => ({ donationPostId: id })),
  setShowSponsorPostPopup: (show) =>
    set(() => ({ showSponsorPostPopup: show })),
  setShowWritePostPopup: (show) => set(() => ({ showWritePostPopup: show })),
  addPosts: (posts) => set((state) => ({ posts: state.posts.concat(posts) })),
  setLatestPostId: (id) => set(() => ({ latestPostId: id })),
}));
