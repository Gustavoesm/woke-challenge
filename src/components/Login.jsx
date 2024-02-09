import React, { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = () => {
    console.log(username, password);
    if (username === "test" && password === "1234") {
      toast.success("Login successful!");
      setTimeout(() => {
        setAuthenticatedUser({ user: username, isAuthenticated: true });
      }, 5000);
    } else {
      toast.error("Login failed!");
      setErrorMessage("Usuário ou senha inválidos.");
    }
  };

  return !authenticatedUser ? (
    <div className="login-box">
      <div className="login-label">Login</div>
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
  ) : (
    <Navigate to="/home" replace={true} />
  );
};

export default Login;
