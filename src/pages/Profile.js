import { motion } from "framer-motion";


const Profile = () => {
  return (
    <motion.div initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.8 } }}>
      <h1>profile</h1>
    </motion.div>
  );
};

export default Profile;
