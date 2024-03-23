import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import { Box } from '@mui/material';
import { useState, useCallback } from "react";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "../utils/config/firebaseConfig";
import { connect } from "react-redux";
import { clearChargers, setChargers } from "../actions";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');

const Home = ({ direction, user, setCharger, chargers, clearCharger, }) => {
	console.log(chargers)
	// States
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	const [searchCoordinates, setSearchCoordinates] = useState({
		source: { coordinates: null, label: '' },
		destination: { coordinates: null, label: '' }
	})
	const [searchLocationCoordinates, setSearchLocationCoordinates] = useState({
		searchlocation: { coordinates: null, label: '' }
	})

	// Handlers
	const showRoute = useCallback(() => {
		if (searchCoordinates.source.coordinates || searchCoordinates.destination.coordinates) {
			clearCharger();

			if (searchCoordinates.source.coordinates) {
				const query = geocollection.near({
					center: new firebase.firestore.GeoPoint(
						searchCoordinates.source.coordinates[1],
						searchCoordinates.source.coordinates[0]
					),
					radius: 100
				});

				console.log(query);
				query.get().then((value) => {
					value.docs.map((charger) => charger.data()).map((charger) => setCharger(charger));
				});
				setShow(true);
				setShowCurrentLocation(false);
			}
		}
	}, [searchCoordinates, setCharger, clearCharger]);


	const setCurrentLocation = () => {
		setShow(false);
		setShowCurrentLocation(true);
	}

	return (

		<motion.div key="home" exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			animate={{ x: 0 }} initial={{ x: direction }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box className="homePage">
				<DashboardMap show={show} showCurrentLocation={showCurrentLocation}
					setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates}
					setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} card={[null]}
					setShow={setShow} chargers={chargers} user={user}
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
				/>
			</Box>
		</motion.div>
	);
}

const mapDispatchFromProps = dispatch => ({
	setCharger: (data) => dispatch(setChargers(data)),
	clearCharger: (data) => dispatch(clearChargers()),
});

export default connect(null, mapDispatchFromProps)(Home);