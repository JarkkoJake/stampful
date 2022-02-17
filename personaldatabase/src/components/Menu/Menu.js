import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { RouteContext } from "../../Contexts/RouterContext";
import "antd/dist/antd.css";
import { Layout, Menu as antdMenu, Drawer, Popconfirm } from "antd";
import {
  UnorderedListOutlined,
  SettingFilled,
  LogoutOutlined
} from "@ant-design/icons";
import "./Menu.css";

const Menu = ({ title }) => {
  const { setRoute } = useContext(RouteContext);
  const [visible, setVisible] = useState(false);

  const showDrawer = (value) => {
    setVisible(value);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logoutText = "Are you sure?";

  return (
    <div>
      <h1 className="stampAuctionDatabase">{title}</h1>
      <button className="browseButton" onClick={() => setRoute("Browse")}>
        Browse
      </button>
      <button className="postButton" onClick={() => setRoute("Post")}>
        Post
      </button>
      <UnorderedListOutlined id="sideMenuButton" onClick={() => showDrawer(true)}/>
      <Drawer title="John Doe" placement="right" onClose={onClose} visible={visible}>
        <button className="settingsButton">Settings <SettingFilled/></button>
        <button className="logoutButton" onClick={() => setRoute("Index")}>
          Logout 
          <LogoutOutlined/>
        </button>
        <h3 className="appVersion">App version 01.00.00</h3>
      </Drawer>
    </div>
  );
};

Menu.defaultProps = {
  title: "Stamp auction database",
};

Menu.protoTypes = {
  title: PropTypes.string.isRequired,
};

export default Menu;
