import React from "react";
import CameraList from "./components/CameraList";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  return (
    <div className="pixel-app">
      <div className="logo">
        <img src="https://wobot.ai/wobot_logo_blue.svg" alt="logo"/>
      </div>
      <CameraList />
      <ToastContainer />
    </div>
  );
};

export default App;
