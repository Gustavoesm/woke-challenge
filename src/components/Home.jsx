import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const config = require("./utils/config.json");

const Home = () => {
  const { authenticatedUser } = useAuth();
  const [userInfo, setState] = useState({});

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  if (authenticatedUser.isAuthenticated && isEmptyObject(userInfo)) {
    axios
      .get(config["baseUrl"] + `/${authenticatedUser.username}/info`)
      .then((response) => {
        setState({
          firstName: response.data.data.firstName,
          fullName: `${response.data.data.firstName} ${response.data.data.lastName}`,
          phone: response.data.data.phone,
          email: response.data.data.email,
          birthDate: response.data.data.birthDate,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  return !authenticatedUser.isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <div className="fill-page">
      <div className="content-box">
        <div className="greet-message">
          {`Área restrita do usuário ${userInfo && userInfo.firstName}`}
        </div>
        <div className="personal-info">
          <div>{"Nome completo"}</div>
          <div className="user-data">{`${userInfo && userInfo.fullName}`}</div>
          <div>{"Telefone"}</div>
          <div className="user-data">{`${userInfo && userInfo.phone}`}</div>
          <div>{"Email"}</div>
          <div className="user-data">{`${userInfo && userInfo.email}`}</div>
          <div>{"Data de nascimento"}</div>
          <div className="user-data">{`${userInfo && userInfo.birthDate}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
