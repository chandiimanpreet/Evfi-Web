import React from "react";
import Mapimpliment from "./components/map/Mapimpliment";
import Floatingbar from "./components/bottombar/Floatingbar";
//import Nav from "./components/navbar/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/bottombar/About";
import Home from "./components/bottombar/Home";
import Location from "./components/bottombar/Location";
import Profile from "./components/bottombar/Profile";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
      <Floatingbar />
    </BrowserRouter>
  );
};

export default App;
