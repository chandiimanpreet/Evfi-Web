import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
//import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
const Home = () => {
	const [show, setShow] = useState(false);
	const [searchCoordinates, setSearchCoordinates] = useState({ source: null, destination: null })
	const showRoute = () => {
		setShow(true)
	}
	return (
		<motion.div initial={{ width: 0 }}
			animate={{ width: '100%' }}
			exit={{ x: window.innerWidth, transition: { duration: 1 } }}>
			{/* <NavigationBar setSearchCoordinates={setSearchCoordinates} showRoute={showRoute} searchCoordinates={searchCoordinates} /> */}

			<DashboardMap show={show} searchCoordinates={searchCoordinates} setSearchCoordinates={setSearchCoordinates}
				showRoute={showRoute} />
		</motion.div>
	);
}

export default Home;