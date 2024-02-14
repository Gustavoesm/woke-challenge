import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const config = require("./utils/config.json");

const Login = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = () => {
    axios
      .post(config["baseUrl"] + config["identityEndpoint"], {
        username,
        password,
      })
      .then((response) => {
        toast.success("Login successful!");
        setTimeout(() => {
          setAuthenticatedUser({
            username,
            authToken: response.data.data.token,
            isAuthenticated: true,
          });
        }, 2000);
      })
      .catch(() => {
        setErrorMessage("Usuário ou senha inválidos.");
      });
  };

  return authenticatedUser.isAuthenticated ? (
    <Navigate to="/home" replace={true} />
  ) : (
    <div>
      <div className="login-box">
        <h1 className="login-label">Login</h1>
        <input
          type="text"
          name="user"
          id="username"
          placeholder="usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="pass"
          id="passwd"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-button" onClick={attemptLogin}>
          Log in
        </button>
        {!!errorMessage && <div className="error-message">{errorMessage}</div>}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default Login;
