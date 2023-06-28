import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
// import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
const Home = () => {
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	const [searchCoordinates, setSearchCoordinates] = useState({ source: { coordinates: null, label: '' }, destination: { coordinates: null, label: '' } })
	const showRoute = () => {
		if (searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates) {
			setShowCurrentLocation(false)
			setShow(true)
		} else {
			window.alert("Please enter values")
		}
	}
	const setCurrentLocation = () => {
		setShow(false);
		setShowCurrentLocation(true)
	}
	const direction = {
		direction: 1
	};

	return (

		<motion.div
			animate={{ width: '100%' }}
			exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			key="home"
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}

			transition={{ duration: 0.25, delay: 0 }}
		>
			{/* <NavigationBar setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} searchCoordinates={searchCoordinates} /> */}

			<DashboardMap show={show} showCurrentLocation={showCurrentLocation} setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates} setSearchCoordinates={setSearchCoordinates}
				showRoute={showRoute} card={[]} />

		</motion.div>
	);
}

export default Home;

