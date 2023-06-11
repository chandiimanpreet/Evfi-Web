import { motion } from "framer-motion";

const Location = ({ direction }) => {
  return (
    <motion.div key="lo" initial={{ x: direction.direction === 1 ? 2000 : -2000, opacity: 0 }}
      animate={{ zIndex: 1, opacity: 1, x: 0 }}
      exit={{ zIndex: 0, opacity: 0 ,transition:{duration:0.1,delay:0}}} transition={{ duration:1,delay:0.3}}>
      <h1>Location</h1>
    </motion.div>
  );
};

export default Location;
