import React from "react";
import { Box, Typography, Grid, } from "@mui/material";
import useStyles from "./styles";
import VPACard from "./RenderVPACard";
import CardDataCard from "./RenderCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Payments = ({ setActivePage }) => {

    //Styles
    const classes = useStyles();

    //Handlers
    const handleBackButton = () => {
        setActivePage(false);

    };

    return (
        <Box sx={{ width: { xs: "90vw", md: "41rem", lg: "50rem" }, height: { xs: "39.4rem", md: "35rem", lg: "35rem" }, paddingTop: { xs: '1rem', md: "0rem" }, overflow: 'auto' }} className={classes.main}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <ArrowBackIcon onClick={handleBackButton} sx={{ color: 'white', display: {xs: 'block', md: 'none'}}} />
                <Typography variant="h5" margin="0 1rem" gutterBottom fontWeight="bold" fontSize="25px" fontFamily="Manrope"
                    color={"white"}>
                    Payments
                </Typography>
            </Box>
            <br />
            <Grid container spacing={2} >
                <Grid item className={classes.cardContainer}>
                    <VPACard />
                    <CardDataCard />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Payments;