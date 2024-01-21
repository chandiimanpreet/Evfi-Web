import { useEffect, useRef, useState } from 'react';
import { Home, PreviousBooking, Request, Profile, Page404, Protector, Phoneauth } from '../pages';
import Registerauth from '../components/Registration/Registerauth';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { bookingUpdate, loadUser, setUserBooking, setProviderRequests, chargerUpdate, setChargers, getChargersID, setChargersID } from '../actions';
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

const AnimatedRoutes = ({ userData, loadingData, loadUser, booking, provider, chargers, setBooking, setProvider, updateBooking, setCharger,
    updateCharger, getChargerID, setChargerID, chargersID }) => {

    const location = useLocation();
    const currentPageIndex = useRef(getPageIndex(location.pathname));
    const [motionDirection, setMotionDirection] = useState("100vw");

    const moveToPageIndex = async (index) => {
        setMotionDirection(index > currentPageIndex.current ? "100vw" : "-100vw");
        currentPageIndex.current = index;
    };

    // console.log(userData.user.level3)


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
                    // console.log(bookingDocs);
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

    useEffect(() => {
        const updateChargersTimeSlot = (userData) => {

            const handleSnapshot = (snapshot) => {
                const changes = snapshot.docChanges();
                const change = changes[0];

                if (!change) {
                    return;
                }

                if (change.type === 'added') {

                    const chargerDocs = snapshot.docChanges().map((change) => ({ ...change.doc.data() }));
                    chargerDocs.map((charger) => setCharger(charger));

                    console.log(chargerDocs);

                    // const uniqueChargersIDs = [];

                    // chargerDocs.forEach(charger => {
                    //     if (!uniqueChargersIDs.includes(charger)) {
                    //         uniqueChargersIDs.push(charger.chargerId);
                    //     }
                    // });

                    chargerDocs.map((charger) => setChargerID(charger.chargerId));

                    // console.log(uniqueChargersIDs);

                }
                else {    // modified
                    const id = changes[0].doc.id;
                    const timeSlot = changes[0].doc.data().timeSlot;
                    console.log(timeSlot);
                    updateCharger({ id, timeSlot });

                }
            };

            const db = getFirestore();
            const bookingRef = collection(db, 'chargers');

            onSnapshot(bookingRef, handleSnapshot, (error) => {
                console.log(error);
            });
        };

        if (userData?.user?.level3) {
            updateChargersTimeSlot(userData);
        }
    }, [userData, updateCharger, setCharger, setChargerID]);

    console.log(chargers)
    console.log(chargersID)

    // 1 for right movement
    // -1 for left movement
    useEffect(() => {
        loadUser();
        // getChargerID();
    }, [loadUser]);

    return (
        loadingData.loading ?
            <CircularProgress sx={{ ml: '45rem', mt: '20rem' }} /> : (
                <AnimatePresence initial={false}>
                    <Routes location={location} key={location.pathname}>
                        <Route element={<Protector flag={userData.user === null || userData.user.level1 === false} moveToPageIndex={moveToPageIndex} />} >
                            <Route path="/" element={<Home direction={motionDirection} user={userData.user} chargers={chargers} />} />
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
    )
};

const mapStateToProps = state => ({
    loadingData: state.loading,
    userData: state.userData,
    booking: state.booking.bookings,
    provider: state.provider.requests,
    chargers: state.charger.chargers,
    uniqueChargersID: state.charger.uniqueChargersID,
});

const mapDispatchFromProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
    setBooking: (data) => dispatch(setUserBooking(data)),
    setProvider: (data) => dispatch(setProviderRequests(data)),
    setCharger: (data) => dispatch(setChargers(data)),
    updateBooking: (data) => dispatch(bookingUpdate(data)),
    updateCharger: (data) => dispatch(chargerUpdate(data)),
    getChargerID: () => dispatch(getChargersID()),
    setChargerID: (data) => dispatch(setChargersID(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(AnimatedRoutes);