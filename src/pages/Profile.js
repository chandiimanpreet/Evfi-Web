import { Button } from "@mui/material";
import { motion } from "framer-motion";

const Profile = ({ logout, direction }) => {
	return (
		<motion.div key='pr'
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<>
				<Button variant="contained" type="button" onClick={() => { logout() }}>Logout</Button>
			</>
		</motion.div>
	);
};

export default Profile;
