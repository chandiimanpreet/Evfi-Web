// import React, { useState } from 'react';
// import { Box, } from "@mui/material";
// import { motion } from 'framer-motion';
// import List from '../components/ListPreviousBooking/List';
// import DashboardMap from '../components/DashboardMap';

// const PreviousBooking = ({ direction, user, userBooking }) => {

// 	// States
// 	const [fetchChargerFromList, setFetchChargerFromList] = useState('');

// 	console.log(userBooking);
// 	// console.log(fetchChargerFromList);

// 	return (
// 		<motion.div key="pb"
// 			initial={{ x: direction }}
// 			animate={{ x: 0 }}
// 			transition={{ duration: 0.25, delay: 0 }}
// 		>
// 			<Box sx={{ display: 'flex', width: "100%" }}>
// 				<Box sx={{ display: { xs: fetchChargerFromList !== '' ? 'none' : 'flex', md: 'flex' }, width: { xs: '100vw', md: '28rem' } }}>
// 					<List user={user} setFetchChargerFromList={setFetchChargerFromList} userBooking={userBooking} />
// 				</Box>

// 				<Box width="100vw" sx={{ display: 'flex', position: { xs: 'fixed', md: 'relative' } }} className="previousBookingPage">
// 					<DashboardMap collectCardData={setFetchChargerFromList} card={fetchChargerFromList} user={user} />
// 				</Box>
// 			</Box>
// 		</motion.div>
// 	)
// }

// export default PreviousBooking;

import React, { useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import List from "../components/ListPreviousBooking/List";
import DashboardMap from "../components/DashboardMap";
import FindCurrentLocation from "../components/DashboardMap/FindCurrentLocation";
import { MapContainer, TileLayer } from "react-leaflet";

const PreviousBooking = ({ direction, user, userBooking }) => {
  const [searchCoordinates, setSearchCoordinates] = useState({
    source: { coordinates: [], label: "" },
    destination: { coordinates: [], label: "" },
  });
  // States
  const [fetchChargerFromList, setFetchChargerFromList] = useState("");

  console.log(userBooking);
  // console.log(fetchChargerFromList);

  return (
    <motion.div
      key="pb"
      initial={{ x: direction }}
      animate={{ x: 0 }}
      transition={{ duration: 0.25, delay: 0 }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{
            display: {
              xs: fetchChargerFromList !== "" ? "none" : "flex",
              md: "flex",
            },
            width: { xs: "100vw", md: "28rem" },
          }}
        >
          <List
            user={user}
            setFetchChargerFromList={setFetchChargerFromList}
            userBooking={userBooking}
          />
        </Box>

        <MapContainer
          zoom={13}
          center={[29.9695, 76.8783]}
          scrollWheelZoom={true}
          minZoom={2}
          maxZoom={18}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FindCurrentLocation
            setSearchCoordinates={setSearchCoordinates}
            searchCoordinates={searchCoordinates}
          />
        </MapContainer>
      </Box>
      <Box
        width="100vw"
        sx={{ display: "flex", position: { xs: "fixed", md: "relative" } }}
        className="previousBookingPage"
      >
        <DashboardMap
          collectCardData={setFetchChargerFromList}
          card={fetchChargerFromList}
        />
      </Box>
    </motion.div>
  );
};

export default PreviousBooking;
