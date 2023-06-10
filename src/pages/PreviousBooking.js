import React from 'react';
import { Box,  } from "@mui/material";
import { motion } from 'framer-motion';
import List from '../components/ListPreviousBooking/List';
import DashboardMap from '../components/DashboardMap';
import FloatingNavbar from '../components/FloatingNavbar';

const PreviousBooking = () => {

  return (
    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 1 } }}>
  
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
