import { motion } from 'framer-motion';
const About = ({ direction }) => {
	return (
		<motion.div
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<h1>About</h1>
		</motion.div>
	)
}

export default About
