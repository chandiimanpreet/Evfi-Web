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
import { loadUser } from '../actions/index'
import { connect } from 'react-redux';

const getPageIndex = (path) => {
    switch (path) {
        case '/': return 0;
        case '/previousBooking': return 1;
        case '/requests': return 2;
        case '/profile': return 3;
        default: return 0;
    }
}

const AnimatedRoutes = ({ userData, loadingData, loadUser }) => {
    const location = useLocation();
    const currentPageIndex = useRef(getPageIndex(location.pathname));
    const [country, setCountry] = useState(null);
    const [motionDirection, setMotionDirection] = useState("100vw");

    const moveToPageIndex = async (index) => {
        setMotionDirection(index > currentPageIndex.current ? "100vw" : "-100vw");
        currentPageIndex.current = index;
    }

    // 1 for right movement
    // -1 for left movement
    useEffect(() => {
        setCountry(getCountryCode());
        loadUser();
    }, [loadUser])
    return (
        loadingData.loading ?

            <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> :

            <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route element={<Protector flag={userData.user === null || userData.user.level1 === false} moveToPageIndex={moveToPageIndex} />} >
                        <Route path="/" element={<Home direction={motionDirection} />} />
                        <Route path="previousBooking" element={<PreviousBooking direction={motionDirection} user={userData.user} />} />
                        <Route path="requests" element={<Request moveToPageIndex={moveToPageIndex} user={userData.user} direction={motionDirection} />} />
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
    userData: state.userData, loadingData: state.loading
})
const mapDispatchFromProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
})
export default connect(mapStateToProps, mapDispatchFromProps)(AnimatedRoutes);