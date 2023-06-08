import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
const Home = () => {
  return (
    <motion.div initial={{ width: 0 }}
    animate={{ width: '100%' }}
    exit={{ x:window.innerWidth,transition:{duration:1} }}>
    <DashboardMap />
    </motion.div>
  );
}

export default Home;