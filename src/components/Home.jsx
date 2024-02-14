import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Combobox from "react-widgets/Combobox";

import { useAuth } from "../contexts/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const config = require("./utils/config.json");

const Home = () => {
  const { authenticatedUser } = useAuth();
  const [userInfo, setState] = useState({});

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const submitAction = () => {
    toast.success(
      "Dados enviados, você deverá receber uma resposta por email em nos próximos dias!",
      { duration: 8000, icon: "ℹ️", style: { fontSize: "1.2rem" } }
    );
  };

  if (authenticatedUser.isAuthenticated && isEmptyObject(userInfo)) {
    axios
      .get(config["baseUrl"] + `/${authenticatedUser.username}/info`, {
        headers: {
          Authorization: "Bearer " + authenticatedUser.authToken,
        },
      })
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
        <h1 className="greet-message">
          {`Área restrita do usuário ${userInfo && userInfo.firstName}`}
        </h1>
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
        <div className="send-to-wrapper">
          <div className="send-to-label">
            {"Para qual empresa deseja enviar seus dados?"}
          </div>
          <div>
            <Combobox
              style={{ fontSize: "1.6rem" }}
              defaultValue="Thales - Woke CTO"
              data={[
                "Amazon.uk",
                "Brivva",
                "EasyJobs.net",
                "Send directly to Google CEO",
                "Thales - Woke CTO",
              ]}
            />
          </div>
          <button className="send-to-button" onClick={submitAction}>
            Enviar
          </button>
          <Toaster position="bottom-right" />
        </div>
      </div>
    </div>
  );
};

export default Home;
