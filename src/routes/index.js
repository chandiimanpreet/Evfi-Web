import React from 'react'
import About from '../pages/About';
import Home from '../pages/Home';
import Location from '../pages/Location';
import Profile from '../pages/Profile';
import Phoneauth from '../pages/auths/Phoneauth';
import Registerauth from '../pages/auths/Registerauth';
import Protector from '../pages/auths/Protector';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';


export default function AnimatedRoutes() {
    const [user, setData] = useState({ "loading": true, "flag": false })
    const [phone, setPhone] = useState("");
    const location = useLocation();

    const setNumber = (num) => {
        setPhone(num);
    }

    const saveUserData = (data) => {
        setData({ ...user, ...data });
    }

    const getUserData = () => {
        fetch(`https://apifromfb.onrender.com/api/get/Users?id=${localStorage.getItem('user')}`)
            .then((response) => response.json())
            .then((data) => { setData({ ...data, "loading": false, "flag": true }) });
    }

    useEffect(() => {
        if (user.loading) {
            if (localStorage.getItem('user')) {
                getUserData();
            } else {
                setData({ "loading": false, "flag": false })
            }
        }
    }, [user.loading]);

    return (
        user.loading ?
        
        <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> :

        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<Protector flag={user.flag} />} >
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="location" element={<Location />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path='register' element={<Registerauth />} setData={saveUserData} />
                </Route>
                <Route path='auth' element={<Phoneauth setNumber={setNumber} phone={phone} setData={saveUserData} />} />
            </Routes>
        </AnimatePresence>
    )
}
