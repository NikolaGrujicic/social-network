import React, { useEffect, useState } from "react";
import { useSocialNetworkStore } from "../store/SocialNetworkStore";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { sponsorPost, getPostById } from "../service/SocialNetworkService";
import { SocialNetworkDB } from "../db/SocialNetworkDB";
import { useLiveQuery } from "dexie-react-hooks";

const SponsorPostPopup = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);

  const { account } = useWeb3React();

  const setShowDonatePopup = useSocialNetworkStore(
    (state) => state.setShowDonatePopup
  );
  const donationPostId = useSocialNetworkStore((state) => state.donationPostId);

  const [amountError, setAmountError] = useState(false);
  const [fundsError, setFundsError] = useState(false);
  const [sameAccountError, setSameAccountError] = useState(false);
  const [alreadySponsoredError, setAlreadySponsoredError] = useState(false);
  const [amount, setAmount] = useState(0);

  const [postCreatorAccount, setPostCreatorAccount] = useState("");

  const sponsoredPosts = useLiveQuery(() =>
    SocialNetworkDB.sponsoredPost.toArray()
  );

  // check if i can make this better, maybe i don't have to call this every time
  const getPostCreatorAccount = async (id) => {
    try {
      console.log("fetching post by id..");
      const post = await getPostById(id);
      console.log("fetched!");
      setPostCreatorAccount(post.owner);
    } catch (error) {
      console.log(error);
    }
  };

  const donate = async () => {
    try {
      //handle the sameAccount and amount errors from the service where we get the error responce, not here
      if (fundsError) {
        return;
      }
      if (sameAccountError) {
        return;
      }
      if (amount == 0) {
        setAmountError(true);
        return;
      } else {
        setAmountError(false);
      }

      console.log("sponsoring a post..");
      await sponsorPost(donationPostId, amount);

      await SocialNetworkDB.sponsoredPost.add({
        account,
        postCreatorAccount,
        donationPostId,
      });

      console.log("The post has been sponsored!");
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)).error.message);
    }
  };

  useEffect(() => {
    if (sponsoredPosts) {
      sponsoredPosts.map((post) => {
        if (
          post.account == account &&
          post.postCreatorAccount == postCreatorAccount
        ) {
          setAlreadySponsoredError(true);
        }
      });
    }
  }, [sponsoredPosts]);

  useEffect(() => {
    getPostCreatorAccount(donationPostId);
  }, [donationPostId]);

  useEffect(() => {
    if (account == postCreatorAccount) {
      setSameAccountError(true);
    } else {
      setSameAccountError(false);
    }

    provider.getBalance(account).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      if (balanceInEth > 0) {
        setFundsError(false);
      } else {
        setFundsError(true);
      }
    });
  }, [postCreatorAccount]);

  return (
    <div className="popup-container">
      <div className="popup-border">
        <div className="popup-close" onClick={() => setShowDonatePopup(false)}>
          x
        </div>
        <input
          type="number"
          className="popup-input"
          placeholder="Enter amount of ETH you want to donate..."
          disabled={
            sameAccountError || fundsError || alreadySponsoredError
              ? true
              : false
          }
          onChange={(event) =>
            setAmount(event.target.value ? event.target.value : 0)
          }
        />
        <div className="popup-button" onClick={() => donate()}>
          <p className="donate-popup-button-text">Donate</p>
        </div>
        {fundsError ? (
          <div className="popup-error">
            <u>You don't have enough crypto.</u>
          </div>
        ) : (
          ""
        )}
        {amountError ? (
          <div className="popup-error">
            <u>The donated amount must be greater than 0.</u>
          </div>
        ) : (
          ""
        )}
        {sameAccountError ? (
          <div className="popup-error">
            <u>You can not sponsor your own post.</u>
          </div>
        ) : (
          ""
        )}
        {alreadySponsoredError ? (
          <div className="popup-error">
            <u>You can not sponsor the same post two times.</u>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SponsorPostPopup;
