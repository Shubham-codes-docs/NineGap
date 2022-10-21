import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");

  return {
    token: storedToken,
  };
};

const AuthProvider = (props) => {
  const tokenData = retrieveToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const onTokenChange = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const authContext = {
    token,
    tokenChangeHandler: onTokenChange,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
