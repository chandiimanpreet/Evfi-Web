import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import { useState } from "react";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "../utils/config/firebaseConfig";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');
const Home = () => {

	// States
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	const [chargers, setChargers] = useState(null);
	const [searchCoordinates, setSearchCoordinates] = useState({
		source: { coordinates: null, label: '' },
		destination: { coordinates: null, label: '' }
	})
	console.log(searchCoordinates);

	const showRoute = () => {
		if (searchCoordinates.source.coordinates || searchCoordinates.destination.coordinates) {
			setChargers(null);
			const query = geocollection.near({ center: new firebase.firestore.GeoPoint(searchCoordinates.source.coordinates[1], searchCoordinates.source.coordinates[0]), radius: 1000 });
			query.get().then((value) => {
				setChargers(value.docs);
				console.log(value.docs);
			})
			setShow(true)
			setShowCurrentLocation(false)
		}

	}
	const setCurrentLocation = () => {
		setShow(false);
		setShowCurrentLocation(true)
		console.log();
	}
	const direction = {
		direction: 1
	};

	return (

		<motion.div key="home" exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			animate={{ x: 0 }} initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<DashboardMap show={show} showCurrentLocation={showCurrentLocation}
				setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates}
				setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} card={[null]}
				chargers={chargers}

			/>
		</motion.div>
	);
}

export default Home;