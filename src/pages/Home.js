import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import { useState } from "react";
const Home = ({ direction }) => {

	// States
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	const [searchCoordinates, setSearchCoordinates] = useState({
		source: { coordinates: null, label: '' },
		destination: { coordinates: null, label: '' }
	})

	// Handlers
	const showRoute = () => {
		if (searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates) {
			setShowCurrentLocation(false)
			setShow(true)
		}
		else {
			window.alert("Please enter values")
		}
	}
	const setCurrentLocation = () => {
		setShow(false);
		setShowCurrentLocation(true)
	}

	return (

		<motion.div key="home" exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			animate={{ x: 0 }} initial={{ x: direction }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<DashboardMap show={show} showCurrentLocation={showCurrentLocation}
				setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates}
				setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} card={[null]}
			/>
		</motion.div>
	);
}

export default Home;

