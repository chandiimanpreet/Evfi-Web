import { Box, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import List from '../components/Request/List';
import { request, recent } from "../components/Request/request";
import { useState } from "react";
import { Link } from "react-router-dom";

const Request = ({ direction }) => {
	const [show, setShow] = useState("pending")
	return (
		<motion.div key="lo"
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}>
			<Box sx={{
				overflowY: 'auto', height: '100vh', width: '100%', backgroundColor: '#000',
				backgroundImage: 'radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)'
			}}>
				<Typography paddingTop={4} textAlign={'center'} color={'antiquewhite'} variant="h5">Booking Requests</Typography>
				<Box marginX={8} paddingY={4} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
					<Box sx={{ display: 'flex', gap: '2rem' }} >
						<Link style={{ textDecoration: show === 'pending' ? 'underline' : 'none', fontSize: '1.6rem', textUnderlineOffset: '8px', color: 'antiquewhite' }} onClick={() => setShow("pending")}>Pending</Link>
						<Link style={{ textDecoration: show === 'recent' ? 'underline' : 'none', fontSize: '1.6rem', textUnderlineOffset: '8px', color: 'antiquewhite' }} onClick={() => setShow("recent")}>Recent</Link>
					</Box>
					<Divider sx={{ backgroundColor: 'antiquewhite' }} />
					<Grid justifyContent={'center'} container columns={3} gap={2}>
						{show === "pending" ?
							request.map((ele) => {
								return <List key={ele.id} show={show} data={ele} />;
							}) : recent.map((ele) => {
								return <List key={ele.id} show={show} data={ele} />;
							})
						}
					</Grid>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Request;
