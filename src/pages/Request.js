import { Box, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import List from '../components/Request/List';
import { request, recent } from "../components/Request/request";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

const Request = ({ direction }) => {
	const [show, setShow] = useState("pending");
	const classes = useStyles();

	return (
		<motion.div key="lo"
			initial={{ x: direction }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box className={classes.bodyPage}>
				<Typography className={classes.heading} variant="h5">Booking Requests</Typography>
				<Box marginX={8} paddingY={4} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
					<Box sx={{ display: 'flex', gap: '2rem' }} >
						<Link className={classes.links} style={{ textDecoration: show === 'pending' ? 'underline' : 'none', }}
							onClick={() => setShow("pending")}>
							Pending
						</Link>
						<Link className={classes.links} style={{ textDecoration: show === 'recent' ? 'underline' : 'none', }}
							onClick={() => setShow("recent")}>
							Recent
						</Link>
					</Box>
					<Divider sx={{ backgroundColor: 'antiquewhite' }} />
					<Grid justifyContent={'center'} container columns={3} gap={2}>
						{show === "pending" ?
							request.map((ele) => <List key={ele.id} show={show} data={ele} />) : 
							recent.map((ele) => <List key={ele.id} show={show} data={ele} />)
						}
					</Grid>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Request;
