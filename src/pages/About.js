import { motion } from 'framer-motion';
const About = () => {
  return (
    <motion.div initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 2 } }}>
      <h1>About</h1>
    </motion.div>
  )
}

export default About
