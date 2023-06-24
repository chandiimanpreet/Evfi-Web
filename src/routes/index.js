import React from 'react'
import About from '../pages/About';
import Home from '../pages/Home';
import Location from '../pages/Location';
import Profile from '../pages/Profile/index';
import PreviousBooking from '../pages/PreviousBooking';
import Phoneauth from '../pages/auths/Phoneauth';
import Registerauth from '../pages/auths/Registerauth';
import Protector from '../pages/auths/Protector';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import Page404 from '../pages/Page404';
import { getUser } from '../utils/auth/user';
import { signOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../utils/config/firebaseConfig';
import axios from 'axios';


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export default function AnimatedRoutes() {

    const [user, setData] = useState({ "loading": true, "flag": false });
    const [countryCode, setCode] = useState(null);
    const [phone, setPhone] = useState("");
    const location = useLocation();
    const [currentDirection, setCurrentDirection] = useState({ previousDirection: location.pathname === '/' ? 0 : location.pathname === '/previousBooking' ? 2 : location.pathname === '/about' ? 3 : location.pathname === '/location' ? 4 : 5, direction: 1 });

    const logout = () => {
        signOut(auth)
            .then(() => {
                setData({ "loading": true, "flag": false });
                setPhone("")
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const saveUserData = (data) => {
        setData({ ...user, ...data });
    }

    const getUserData = async () => {
        const temp2=await axios.get('https://1.1.1.1/cdn-cgi/trace');
        const regex=/^loc=([A-Z]+)$/;
        const response=temp2.data.split('\n');
        let code;
        for(let i=0;i<response.length;i++){
            let matches=response[i].match(regex)
            if(matches){
                code=matches[1];
            }  
        }
        code=code.toLowerCase();
        setCode(code);   
        const res = await getUser();
        if (!res.user) {
            
            setData({ "loading": false, "flag": false });
            return;
        }
        setData({ ...res.user, "loading": false, "flag": true });
    }
    const setDirection = (val) => {
        if (currentDirection.previousDirection < val) {
            setCurrentDirection({ previousDirection: val, direction: 1 });
        } else if (currentDirection.previousDirection > val) {
            setCurrentDirection({ previousDirection: val, direction: -1 });
        }
    }
    // 1 for right movement
    // -1 for left movement
    useEffect(() => {
        if (user.loading) {
            getUserData();
        }
    }, [user.loading]);

    return (
        user.loading ?

            <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> :

            <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route element={<Protector flag={user.flag} setDirection={setDirection} />} >
                        <Route path="/" element={<Home direction={currentDirection} />} />
                        <Route path="previousBooking" element={<PreviousBooking direction={currentDirection} />} />
                        <Route path="about" element={<About direction={currentDirection} />} />
                        <Route path="location" element={<Location direction={currentDirection} />} />
                        <Route path="profile" element={<Profile direction={currentDirection} logout={logout} />} />
                        <Route path='register' element={<Registerauth user={user} direction={currentDirection} setData={saveUserData} />} />
                    </Route>
                    <Route path='auth' element={<Phoneauth code={countryCode} setNumber={setPhone} flag={user.flag} phone={phone} setData={saveUserData} />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </AnimatePresence>
    )
}
