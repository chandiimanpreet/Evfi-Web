import { motion } from "framer-motion";

const Location = () => {
  return (
    <motion.div initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x:window.innerWidth,transition:{duration:2} }}>
      <h1>Location</h1>
    </motion.div>
  );
};

export default Location;
