import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import { Box } from '@mui/material';
import { useState, useCallback } from "react";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "../utils/config/firebaseConfig";
import { connect } from "react-redux";
import { setChargers } from "../actions";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');

const Home = ({ direction, user, setCharger, chargers, uniqueChargersID }) => {

	// States
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	// const [chargers, setChargers] = useState(null);
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
			// setChargers([null]);

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
					// setChargers(value.docs);
					// value.docs.map((charger) => charger.data()).map((charger) => setCharger(charger));
					value.docs.map((charger) => charger.data()).map((charger) => (!uniqueChargersID.includes(charger.chargerId) && setCharger(charger)));

				});
				setShow(true);
				setShowCurrentLocation(false);
			}
		}
	}, [searchCoordinates, setCharger,uniqueChargersID]);


	const setCurrentLocation = () => {
		setShow(false);
		setShowCurrentLocation(true);
	}
	console.log(chargers);
	console.log(uniqueChargersID)

	return (

		<motion.div key="home" exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			animate={{ x: 0 }} initial={{ x: direction }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box className="homePage">
				<DashboardMap show={show} showCurrentLocation={showCurrentLocation}
					setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates}
					setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} card={[null]}
					setShow={setShow} chargers={chargers}
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
				/>
			</Box>
		</motion.div>
	);
}


const mapStateToProps = state => ({
	uniqueChargersID: state.charger.uniqueChargersID,
});

const mapDispatchFromProps = dispatch => ({
	setCharger: (data) => dispatch(setChargers(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Home);