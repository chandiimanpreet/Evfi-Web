import React, { useRef } from 'react';
import Home from '../pages/Home';
import Request from '../pages/Request';
import Profile from '../pages/Profile/index';
import PreviousBooking from '../pages/PreviousBooking';
import Phoneauth from '../pages/auths/Phoneauth';
import Registerauth from '../components/Registration/Registerauth';
import Protector from '../pages/auths/Protector';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import Page404 from '../pages/Page404';
import { getCountryCode } from '../utils/timezone/index';
import { loadUser,  setBooking, setProvider } from '../actions/index'
import { connect } from 'react-redux';
import { collection, getFirestore, onSnapshot, } from "firebase/firestore";

const getPageIndex = (path) => {
    switch (path) {
        case '/': return 0;
        case '/previousBooking': return 1;
        case '/requests': return 2;
        case '/profile': return 3;
        default: return 0;
    }
}

const AnimatedRoutes = ({ userData, loadingData, loadUser, setBooking, booking, provider, setProvider }) => {

    const location = useLocation();
    const currentPageIndex = useRef(getPageIndex(location.pathname));
    const [country, setCountry] = useState(null);
    const [motionDirection, setMotionDirection] = useState("100vw");

    const moveToPageIndex = async (index) => {
        setMotionDirection(index > currentPageIndex.current ? "100vw" : "-100vw");
        currentPageIndex.current = index;
    };

    useEffect(() => {
        const getBooking = (userData) => {

            const db = getFirestore();
            const bookingRef = collection(db, 'booking');

            onSnapshot(bookingRef, (snapshot) => {
                setBooking(snapshot.docs.map((doc) => ({ ...doc.data(), bookingId: doc.id })).filter((book) => book?.userId === userData.user?.uid));
                setProvider(snapshot.docs.map((doc) => ({ ...doc.data(), bookingId: doc.id })).filter((prov) => prov?.chargerId === userData.chargers[0]));
            }, (error) => {
                console.log(error);
            });
        };
        getBooking(userData);

    }, [userData, setBooking, setProvider]);

    // 1 for right movement
    // -1 for left movement
    useEffect(() => {
        setCountry(getCountryCode());
        loadUser();
    }, [loadUser]);

    return (
        loadingData.loading ?

            <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> :

            <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route element={<Protector flag={userData.user === null || userData.user.level1 === false} moveToPageIndex={moveToPageIndex} />} >
                        <Route path="/" element={<Home direction={motionDirection} user={userData.user} />} />
                        <Route path="previousBooking" element={<PreviousBooking direction={motionDirection} user={userData.user}  book={Object.values(booking)}/>} />
                        <Route path="requests" element={<Request moveToPageIndex={moveToPageIndex} user={userData.user} book={Object.values(provider)} direction={motionDirection} />} />
                        <Route path="profile" element={<Profile direction={motionDirection} />} />
                    </Route>
                    <Route path='register/:level' element={<Registerauth />} />
                    <Route path='auth' element={<Phoneauth country={country} />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </AnimatePresence>
    )
}
const mapStateToProps = state => ({
    userData: state.userData, loadingData: state.loading,
    booking: state.booking, provider: state.provider,
})
const mapDispatchFromProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
    setBooking: (data) => dispatch(setBooking(data)),
    setProvider: (data) => dispatch(setProvider(data)),
})
export default connect(mapStateToProps, mapDispatchFromProps)(AnimatedRoutes);