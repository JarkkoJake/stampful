import React, { createContext, useState } from "react";
import { constants } from "../Constants.js";

export const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {
  return (
    <BrowseContext.Provider
      value={{
        
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};