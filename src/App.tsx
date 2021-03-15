import React from "react";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import AuthProvider from "./Components/Auth/AuthContext";

const App = () => {
  return (
    <div className={"body"}>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </div>
  );
};

export default App;
