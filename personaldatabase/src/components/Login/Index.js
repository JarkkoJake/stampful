import React, { useContext } from "react";
import { constants } from "../../Constants";
import { LoginContext } from "../../Contexts/LoginContext";
import { RouteContext } from "../../Contexts/RouterContext";
import { Input } from "antd";
import PropTypes from "prop-types";
import "./Login.css";
import axios from "axios";


const Index = ({ title }) => {
  const { password, username, setUsername, setPassword} = useContext(LoginContext);
  const { setRoute } = useContext(RouteContext);

  const loginCall = (user, pass) => { 
    axios
      .get(`${constants.URL}/login`,
        {
          params: {
            username: user,
            password: pass
          }
        })
      .then((res) => {
        if (res.data.validation) {setRoute("Menu");
        } else {
          alert("Username or Password incorrect");
          setPassword("");
          setUsername("");
          return null;
        }
      });
  };

  const submit = (err) => {
    if (err) console.error(err);
    else {
      loginCall(username, password);
    }
  };

  return (
    <div className="header">
      <h1 id="title">{title}</h1>

      <Input
        id="username"
        placeholder={"Username..."}
        value={username}
        onChange={(value) => setUsername(value.target.value)}
      />
      <Input
        id="password"
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
