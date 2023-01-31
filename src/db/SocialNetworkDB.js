import Dexie from "dexie";

export const SocialNetworkDB = new Dexie("SocialNetworkDB");
SocialNetworkDB.version(1).stores({
  posts: "++id, text, owner, timestamp, postID", // Add all posts db and assign id's
  sponsoredPost: "++id, userAddress, postAddress, postID",
});
