import React, { useRef } from 'react';
import Home from '../pages/Home';
import Request from '../pages/Request';
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
import Provider from '../pages/auths/Provider';

const getPageIndex = (path) => {
    switch (path) {
        case '/': return 0;
        case '/previousBooking': return 1;
        case '/requests': return 2;
        case '/profile': return 3;
        default: return 0;
    }
}

const AnimatedRoutes = () => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const location = useLocation();
    const currentPageIndex = useRef(getPageIndex(location.pathname));

    const [user, setData] = useState({ "loading": true, "flag": false });
    const [countryCode, setCountryCode] = useState(null);
    const [phone, setPhone] = useState("");
    const [motionDirection, setMotionDirection] = useState("100vw");

    const logout = async () => {
        try {
            await signOut(auth);
            setData({ "loading": true, "flag": false });
            setPhone("")
        } catch (error) {
            console.log(error.message);
        }
    }

    const saveUserData = (data) => {
        setData({ ...user, ...data });
    }

    const getUserData = async () => {
        try {
            const temp2 = await axios.get('https://1.1.1.1/cdn-cgi/trace');
            const response = temp2.data.split('\n');
            let code = response[9].substring(4);
            code = code.toLowerCase();
            setCountryCode(code);
        } catch (error) {
            console.log(error.message);
            setData({ "loading": false, "flag": false });
            return;
        } finally {
            const res = await getUser();
            if (res.user) {
                setData({ "loading": false, "flag": true, ...res.user });
            } else {
                setData({ "loading": false, "flag": false });
            }
        }
    }

    const moveToPageIndex = async (index) => {
        setMotionDirection(index > currentPageIndex.current ? "100vw" : "-100vw");
        currentPageIndex.current = index;
    }

    // 1 for right movement
    // -1 for left movement
    useEffect(() => {
        if (user.loading) {
            getUserData();
        }
    }, [user.loading]);
    // <Route path="/" element={<Home direction={currentDirection} />} />

    return (
        user.loading ?

            <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> :

            <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route element={<Protector flag={user.flag} moveToPageIndex={moveToPageIndex} />} >
                        <Route path="/" element={<Home direction={motionDirection} />} />
                        <Route path="previousBooking" element={<PreviousBooking direction={motionDirection} user={user} />} />
                        <Route path="requests" element={<Request direction={motionDirection} />} />
                        <Route path="profile" element={<Profile direction={motionDirection} logout={logout} />} />
                    </Route>
                    <Route path='auth' element={<Phoneauth code={countryCode} setNumber={setPhone} flag={user.flag} phone={phone} setData={saveUserData} />} />
                    <Route path='register' element={<Registerauth user={user} setData={saveUserData} />} />
                    <Route path='provider-register' element={<Provider user={user} setData={saveUserData} />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </AnimatePresence>
    )
}

export default AnimatedRoutes;