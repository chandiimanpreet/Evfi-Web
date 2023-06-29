import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import { useState } from "react";
const Home = () => {
	const [show, setShow] = useState(false);
	const [showCurrentLocation, setShowCurrentLocation] = useState(false);
	const [searchCoordinates, setSearchCoordinates] = useState({
		source: { coordinates: null, label: '' },
		destination: { coordinates: null, label: '' }
	})

	const showRoute = () => {
		if (searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates) {
			setShowCurrentLocation(false)
			setShow(true)
		}
		else if (searchCoordinates.current.coordinates && searchCoordinates.destination.coordinates) {
			setShowCurrentLocation(false)
			setShow(true)
		}
		else if (searchCoordinates.current.coordinates && searchCoordinates.destination.coordinates) {
			setShow(false);
			setShowCurrentLocation(true);
		}
		else {
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
			key="home"
			exit={{ x: window.innerWidth, transition: { duration: 1 } }}
			animate={{ x: 0 }}
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			transition={{ duration: 0.25, delay: 0 }}
		>

			<DashboardMap
				show={show}
				showCurrentLocation={showCurrentLocation}
				setCurrentLocation={setCurrentLocation}
				searchCoordinates={searchCoordinates}
				setSearchCoordinates={setSearchCoordinates}
				showRoute={showRoute}
				card={[]}
			/>

		</motion.div>
	);
}

export default Home;

