import React from "react";

const AuthContext = React.createContext({
  token: "",
  tokenChangeHandler: (token) => {},
});

export default AuthContext;
