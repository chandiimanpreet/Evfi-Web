import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import NavigationBar from "../components/NavigationBar";
const Home = () => {
  return (
    <motion.div initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 1 } }}>
      <NavigationBar />
      <DashboardMap />
    </motion.div>
  );
}

export default Home;