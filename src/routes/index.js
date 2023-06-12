import React from 'react'
import About from '../pages/About';
import Home from '../pages/Home';
import Location from '../pages/Location';
import Profile from '../pages/Profile';
import PreviousBooking from '../pages/PreviousBooking';
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

    const logout=()=>{
        localStorage.clear()
        setData({ "loading": true, "flag": false })
    }
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
    const [currentDirection,setCurrentDirection]=useState({previousDirection:location.pathname==='/'?0:location.pathname==='/previousBooking'?2:location.pathname==='/about'?3:location.pathname==='/location'?4:5,direction:1});
    const setDirection=(val)=>{
        if(currentDirection.previousDirection<val){
            setCurrentDirection({previousDirection:val,direction:1})
        }else if(currentDirection.previousDirection>val){
            setCurrentDirection({previousDirection:val,direction:-1})
        }
    }
    // 1 for right movement
    // -1 for left movement
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

        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route element={<Protector flag={user.flag} setDirection={setDirection}/>} >
                    <Route path="/" element={<Home direction={currentDirection} />} />
                    <Route path="previousBooking" element={<PreviousBooking direction={currentDirection}/>} />
                    <Route path="about" element={<About direction={currentDirection}/>} />
                    <Route path="location" element={<Location direction={currentDirection}/>} />
                    <Route path="profile" element={<Profile direction={currentDirection} logout={logout}/>} />
                    <Route path='register' element={<Registerauth direction={currentDirection} setData={saveUserData}/>}  />
                </Route>
                <Route path='auth' element={<Phoneauth setNumber={setNumber} phone={phone} setData={saveUserData} />} />
            </Routes>
        </AnimatePresence>
    )
}
