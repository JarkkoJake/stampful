import React, { createContext, useState, useEffect } from "react";
import Index from "../Components/Login/Index";
import Menu from "../Components/Menu/Menu";
import Post from "../Components/Post/Post";
import Browse from "../Components/Browse/Browse";
import { SingleView } from "../Components/SingleView/SingleView";

export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState("Index");

  const Route = () => {
    switch (route) {
    case "Index":
      return <Index />;
    case "Post":
      return <Post/>;
    case "Menu":
      return <Menu />;
    case "Browse":
      return <Browse />;
    case "SingleView":
      return <SingleView/>;
    default:
      return <Index />;
    }
  };
  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
      }}
    >
      <Route />
      {children}
    </RouteContext.Provider>
  );
};
