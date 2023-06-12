import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import NavigationBar from "../components/NavigationBar";
const Home = ({ direction }) => {
	return (
		<motion.div key="home"
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<NavigationBar />
			<DashboardMap />
		</motion.div>
	);
}

export default Home;