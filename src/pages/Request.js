import { Box, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import List from '../components/Request/List';
import { request, recent } from "../components/Request/request";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";
import Provider from '../components/Registration/Provider';
import FloatingNavbar from '../components/FloatingNavbar';

const Request = ({ direction, user, setData, moveToPageIndex }) => {
	const [show, setShow] = useState("pending");
	const classes = useStyles();

	return (
		<motion.div key="lo"
			initial={{ x: direction }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			{user.isProvider === false ? <Provider user={user} setData={setData} /> :
				<>
					<Box className={classes.bodyPage}>
						<Typography className={classes.heading} variant="h5">Booking Requests</Typography>
						<Box marginX={2} paddingY={2} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
							<Grid justifyContent={'center'} container gap={2.5}>
								{show === "pending" ?
									request.map((ele) => <List key={ele.id} show={show} data={ele} />) :
									recent.map((ele) => <List key={ele.id} show={show} data={ele} />)
								}
							</Grid><br /><br />
						</Box>
					</Box>
					<FloatingNavbar moveToPageIndex={moveToPageIndex} />
				</>
			}
		</motion.div>
	);
};

export default Request;
