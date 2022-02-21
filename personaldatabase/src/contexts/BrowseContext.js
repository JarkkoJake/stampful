import React, { createContext, useState } from "react";
import { constants } from "../Constants.js";

export const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {

  const defaultRequestObj = {listType: "listbrowse", page: 1};

  const [requestObject, setRequestObject] = useState(defaultRequestObj);

  const constructUrl = async () => {
    const keys = Object.keys(requestObject);
    let URL = constants.URL + "/auctions";
    keys.forEach(key => {
      if (key === "listType") URL = URL + "/" + requestObject.listType + "?";
      else URL = URL + "&" + key + "=" + requestObject[key];
    });
    console.log(URL);
    return URL;
  };

  return (
    <BrowseContext.Provider
      value={{
        constructUrl,
        requestObject,
        setRequestObject,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};