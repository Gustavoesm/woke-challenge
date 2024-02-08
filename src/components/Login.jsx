import React from "react";

const attemptLogin = () => {
  console.log("login");
};

const Login = () => {
  return (
    <div className="login-box">
      <div className="login-label">Login</div>
      <input type="text" name="user" id="username" placeholder="usuário" />
      <input type="password" name="pass" id="passwd" placeholder="senha" />
      <button type="submit" className="submit-button" onClick={attemptLogin}>
        Log in
      </button>
    </div>
  );
};

export default Login;
