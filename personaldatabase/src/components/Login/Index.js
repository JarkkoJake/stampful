import React, { useContext } from "react";
import { constants } from "../../Constants";
import { LoginContext } from "../../Contexts/LoginContext";
import { RouteContext } from "../../Contexts/RouterContext";
import { Input } from "antd";
import PropTypes from "prop-types";
import "./Login.css";
import axios from "axios";


const Index = ({ title }) => {
  const { password, setPassword, setToken} = useContext(LoginContext);
  const { setRoute } = useContext(RouteContext);

  const loginCall = (pass) => { 
    axios
      .post(`${constants.URL}/login`,
        {
          password: pass
        })
      .then((res) => {
        if (res.data.accessToken) {
          setRoute("Menu");
          setToken(res.data.accessToken);
        } else {
          alert("Password incorrect");
          setPassword("");
        }
      }).catch(() => {
        alert("Password incorrect");
      });
  };

  const submit = (err) => {
    if (err) console.error(err);
    else {
      loginCall(password);
    }
  };

  return (
    <div className="header">
      <h1 id="title">{title}</h1>

      <Input
        id="password"
        type="password"
        placeholder={"Password..."}
        value={password}
        onChange={(value) => setPassword(value.target.value)}
      />

      <button className="loginButton" onClick={() => submit()}>
        LOGIN
      </button>
    </div>
  );
};

Index.defaultProps = {
  title: "Stampful",
};

Index.protoTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;
