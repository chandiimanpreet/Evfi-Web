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
import { bookingUpdate, loadUser, userBookingRequests, getBookingRequests } from '../actions/index'
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

const AnimatedRoutes = ({ userData, loadingData, loadUser, setBooking, booking, provider, setProvider, updateBooking }) => {

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

            const handleSnapshot = (snapshot) => {
                const changes = snapshot.docChanges();
                const change = changes[0];
                if (!change) {
                    return;
                }

                if (change.type === 'added') {
                    const bookingDocs = snapshot.docChanges().map((change) => ({ ...change.doc.data(), bookingId: change.doc.id }));
                    const userBookings = bookingDocs.filter((book) => book.uId === userData.user?.uid);
                    userBookings.forEach((booking) => setBooking(booking));

                    const requestBookings = bookingDocs.filter((prov) => prov.providerId === userData.user?.uid);
                    setProvider(requestBookings);


                } else {    // modified
                    const id = changes[0].doc.id;
                    const status = changes[0].doc.data().status;
                    updateBooking({ id, status });
                }
            };

            const db = getFirestore();
            const bookingRef = collection(db, 'booking');

            onSnapshot(bookingRef, handleSnapshot, (error) => {
                console.log(error);
            });
        };
        getBooking(userData);
    }, [userData, setBooking, setProvider, updateBooking]);

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
                        <Route path="previousBooking" element={<PreviousBooking direction={motionDirection} user={userData.user} userBooking={booking} />} />
                        <Route path="requests" element={<Request moveToPageIndex={moveToPageIndex} user={userData.user} bookingRequests={provider} direction={motionDirection} />} />
                        <Route path="profile" element={<Profile direction={motionDirection} />} />
                    </Route>
                    <Route path='register/:level' element={<Registerauth />} />
                    <Route path='auth' element={<Phoneauth country={country} />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </AnimatePresence>
    )
};

const mapStateToProps = state => ({
    userData: state.userData, loadingData: state.loading,
    booking: state.booking.bookings, provider: state.provider.bookings,
});

const mapDispatchFromProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
    setBooking: (data) => dispatch(userBookingRequests(data)),
    setProvider: (data) => dispatch(getBookingRequests(data)),
    updateBooking: (data) => dispatch(bookingUpdate(data))
});

export default connect(mapStateToProps, mapDispatchFromProps)(AnimatedRoutes);