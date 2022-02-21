import React, { createContext, useState } from "react";
import axios from "axios";
import { constants } from "../Constants";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  
  const [postContent, setPostContent] = useState({});
  const [imageData, setImageData] = useState(new FormData());

  const emptyAuction = {};

  const setPostItem = (target, value) => {
    postContent[target] = value;
  };

  const saveAuction = () => {
    postContent.currency = "€";
    axios
      .post(`${constants.URL}/auctions`, postContent)
      .then((res) => {
        console.log(res);
        saveImages(res.data[0]);
      });
  };

  const saveImages = (auctionId) => {
    axios
      .post(`${constants.URL}/image/${auctionId}`, imageData)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <PostContext.Provider
      value={{
        postContent,
        setPostContent,
        emptyAuction,
        imageData,
        setImageData,
        setPostItem,
        saveAuction
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
