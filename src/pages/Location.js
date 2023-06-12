import { motion } from "framer-motion";

const Location = ({ direction }) => {
	return (
		<motion.div key="lo"
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<h1>Location</h1>
		</motion.div>
	);
};

export default Location;
