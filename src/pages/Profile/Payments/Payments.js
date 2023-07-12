import React from "react";
import { Box, Typography, Grid, } from "@mui/material";
import useStyles from "./styles";
import VPACard from "./RenderVPACard";
import CardDataCard from "./RenderCard";

const Payments = () => {

    //Styles
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h5" gutterBottom fontWeight="bold" fontSize="25px" fontFamily="Manrope"
                color={"white"}>
                Payments
            </Typography>
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