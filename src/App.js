import React from "react";
import Mapimpliment from "./components/map/Mapimpliment";
import Floatingbar from "./components/bottombar/Floatingbar";
import Nav from "./components/navbar/Nav";
//import Nav from "./components/navbar/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Profile from "./pages/Profile";
import { Padding } from "@mui/icons-material";
const App = () => {
  return (
    <BrowserRouter
      style={{ height: "100vh", width: "100vw", margin: "0", padding: "0" }}
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Floatingbar />
    </BrowserRouter>
  );
};

export default App;
