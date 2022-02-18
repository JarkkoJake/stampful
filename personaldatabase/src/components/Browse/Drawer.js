import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import { BrowseContext } from "../../Contexts/BrowseContext";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import { MenuOutlined } from "@ant-design/icons";
import "./Browse.css";

const DrawerComponent = (props) => {
  const { requestObject } = useContext(BrowseContext);

  return (
    <Drawer
      placement="left"
      onClose={props.closeFunction}
      closable={true}
      visible={props.visible}
      key="left"
      maskClosable={false}
      width={"400px"}
    >
      <button id="clearAll">
        Clear all
      </button>

      <select name="country" id="count" className="selectBox" onChange={(e) => {requestObject.country = e.target.value; console.log(requestObject); requestObject.page = 1;}}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </Drawer>
  );
    
};

export default DrawerComponent ;
