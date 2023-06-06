import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Location from './pages/Location';
import Profile from './pages/Profile';

import Phoneauth from './components/auths/Phoneauth';
import Otpauth from './components/auths/Otpauth';
import Registerauth from './components/auths/Registerauth';
import { useEffect, useState } from 'react';
import Protector from './components/auths/Protector';

const App = () => {

  const [user, setData] = useState(null)
  const [phone, setPhone] = useState("");
  const setNumber = (num) => {
    setPhone(num)
  }
  const saveUserData = (data) => {
    setData({ ...user, ...data });
  }
  const getUserData = () => {
    fetch(`https://apifromfb.onrender.com/api/get/Users?id=${localStorage.getItem('user')}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    if (localStorage.getItem('user')) {
      getUserData();
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protector />}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/register' element={<Registerauth />} setData={saveUserData} />
        </Route>
        <Route path='/auth' element={<Phoneauth setNumber={setNumber} phone={phone} />} />
        <Route path='/otpauth' element={<Otpauth phone={phone} setData={saveUserData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
