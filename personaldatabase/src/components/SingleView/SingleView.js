import React from "react";
import { BrowseContext } from "../../Contexts/BrowseContext";

export const SingleView = () => {
  const {singleAuction} = React.useContext(BrowseContext);
  return <div>
    <h1>{singleAuction.id || "No ID"}</h1>
  </div>;
};