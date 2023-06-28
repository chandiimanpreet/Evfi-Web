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
	return (
		<motion.div initial={{ width: 0 }}
			animate={{ width: '100%' }}
			exit={{ x: window.innerWidth, transition: { duration: 1 } }}>
			{/* <NavigationBar setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} searchCoordinates={searchCoordinates} /> */}

			<DashboardMap show={show} showCurrentLocation={showCurrentLocation} setCurrentLocation={setCurrentLocation} searchCoordinates={searchCoordinates} setSearchCoordinates={setSearchCoordinates}
				showRoute={showRoute} />
		</motion.div>
	);
}

export default Home;