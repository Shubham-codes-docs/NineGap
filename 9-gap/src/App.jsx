import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Index";
import authContext from "./store/AuthContext";
function App() {
  const authCtx = useContext(authContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            authCtx.token ? (
              <Dashboard />
            ) : (
              <p>Please Login to view this page</p>
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
