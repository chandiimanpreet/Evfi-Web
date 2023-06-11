import { motion } from "framer-motion";
import DashboardMap from "./../components/DashboardMap";
import NavigationBar from "../components/NavigationBar";
const Home = ({ direction }) => {
  return (
    <motion.div key="home" initial={{ x: direction.direction === 1 ? 2000 : -2000, opacity: 0 }}
      animate={{ zIndex: 1, opacity: 1, x: 0 }}
      exit={{ zIndex: 0, opacity: 0,transition:{duration:0.1,delay:0}}} transition={{ duration:0.8,delay:0.3}} >
      <NavigationBar />
      <DashboardMap />
    </motion.div>
  );
}

export default Home;