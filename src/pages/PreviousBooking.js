import React from 'react';
import { Box,  } from "@mui/material";
import { motion } from 'framer-motion';
import List from '../components/ListPreviousBooking/List';
import DashboardMap from '../components/DashboardMap';
import FloatingNavbar from '../components/FloatingNavbar';

const PreviousBooking = ({direction}) => {

  return (
    <motion.div key="pb" 
    initial={{x:direction.direction===1?2000:-2000,opacity:0}}
    animate={{zIndex:1,opacity:1,x:0}}
    exit={{zIndex:0,opacity:0,transition:{duration:0.1,delay:0}}} transition={{ duration:1,delay:0.3}}    
    >
  
      <Box sx={{ display: 'flex', }}>
        <Box>
          <List />
        </Box>
        <Box>
          <DashboardMap />
          <FloatingNavbar />
        </Box>
      </Box>
    </motion.div>
  )
}

export default PreviousBooking;
