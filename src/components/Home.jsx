import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Combobox from "react-widgets/Combobox";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@mui/material";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import avatar from "./utils/avatar.png";

const config = require("./utils/config.json");

const Home = () => {
  const { authenticatedUser } = useAuth();
  const [userInfo, setState] = useState({});

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const submitAction = () => {
    axios
      .post(
        config["dataConsumeApi"],
        {
          fullName: userInfo.fullName,
          phone: userInfo.phone,
          email: userInfo.email,
          birthDate: userInfo.birthDate,
        },
        {
          headers: {
            Authorization: "Bearer " + authenticatedUser.authToken,
          },
        }
      )
      .then(() => {
        toast.success(
          "Dados enviados, você deverá receber uma resposta por email em nos próximos dias!",
          { duration: 8000, icon: "ℹ️", style: { fontSize: "1.2rem" } }
        );
      })
      .catch((err) => {
        toast.error("Não foi possível enviar os seus dados.");
        console.log(err);
      });
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
          <div>
            <div>{"Nome completo"}</div>
            <div className="user-data">{`${
              userInfo && userInfo.fullName
            }`}</div>
            <div>{"Telefone"}</div>
            <div className="user-data">{`${userInfo && userInfo.phone}`}</div>
            <div>{"Email"}</div>
            <div className="user-data">{`${userInfo && userInfo.email}`}</div>
            <div>{"Data de nascimento"}</div>
            <div className="user-data">{`${
              userInfo && userInfo.birthDate
            }`}</div>
          </div>
          <img className="profile-picture" src={avatar} />
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
          <div className="button-wrapper">
            <Button
              variant="contained"
              sx={{ width: "inherit", height: "inherit" }}
              onClick={submitAction}
              size="large"
            >
              Enviar
            </Button>
          </div>
          <Toaster position="bottom-right" />
        </div>
      </div>
    </div>
  );
};

export default Home;
