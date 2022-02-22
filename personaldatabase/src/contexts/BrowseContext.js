import React, { createContext, useState } from "react";
import { constants } from "../Constants.js";

export const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {

  const defaultRequestObj = {listType: "listbrowse", page: 1};

  let [requestObject, setRequestObject] = useState(defaultRequestObj);


  const [detailedObject, setDetailedObject] = useState({});


  let [filterObject, setFilterObject] = useState(defaultRequestObj);

  const constructUrl = async (reqObj) => {
    let keys;
    let URL = constants.URL + "/auctions";
    if (reqObj) {
      keys = Object.keys(reqObj);
      keys.forEach(key => {
        if (key === "listType") URL = URL + "/" + reqObj.listType + "?";
        else if (reqObj[key] === "" || reqObj[key] === false) null;
        else URL = URL + "&" + key + "=" + reqObj[key];
      });
    } else {
      keys = Object.keys(requestObject);
      keys.forEach(key => {
        if (key === "listType") URL = URL + "/" + requestObject.listType + "?";
        else if (requestObject[key] === "" || requestObject[key] === false) null;
        else URL = URL + "&" + key + "=" + requestObject[key];
      });
    }
    console.log(URL);
    return URL;
  };

  return (
    <BrowseContext.Provider
      value={{
        constructUrl,
        requestObject,
        setRequestObject,

        detailedObject,
        setDetailedObject,
        defaultRequestObj,
        filterObject,
        setFilterObject,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};
