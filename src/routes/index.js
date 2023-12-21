import { useEffect, useRef, useState } from 'react';
import { Home, PreviousBooking, Request, Profile, Page404, Protector, Phoneauth } from '../pages';
import Registerauth from '../components/Registration/Registerauth';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { bookingUpdate, loadUser, setUserBooking, setProviderRequests, } from '../actions';
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

const AnimatedRoutes = ({ userData, loadingData, loadUser, setBooking, booking, provider, setProvider, updateBooking, loadBookings, loadRequests }) => {

    const location = useLocation();
    const currentPageIndex = useRef(getPageIndex(location.pathname));
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

                    // User Booking
                    bookingDocs.filter((book) => book.uId === userData.user?.uid).map((booking) => setBooking(booking));

                    // Charing Requests for Provider
                    bookingDocs.filter((prov) => prov.providerId === userData.user?.uid).map((request) => setProvider(request));

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
                    <Route path='auth' element={<Phoneauth />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </AnimatePresence>
    )
};

const mapStateToProps = state => ({
    userData: state.userData, loadingData: state.loading,
    booking: state.booking.bookings, provider: state.provider.requests,
});

const mapDispatchFromProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
    setBooking: (data) => dispatch(setUserBooking(data)),
    setProvider: (data) => dispatch(setProviderRequests(data)),
    updateBooking: (data) => dispatch(bookingUpdate(data)),

});

export default connect(mapStateToProps, mapDispatchFromProps)(AnimatedRoutes);