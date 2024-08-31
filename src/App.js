import React from "react";
import CameraList from "./components/CameraList";
import './App.css';

const App = () => {
  return (
    <div>
      <div className="logo">
        <img src="https://wobot.ai/wobot_logo_blue.svg" />
      </div>
      <CameraList />
    </div>
  );
};

export default App;
