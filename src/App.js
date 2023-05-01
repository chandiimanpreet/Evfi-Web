import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Profile from "./pages/Profile";
import FloatingNavbar from "./components/FloatingNavbar";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <FloatingNavbar />
    </BrowserRouter>
  );
};

export default App;
