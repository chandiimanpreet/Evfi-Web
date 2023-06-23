import React from "react";
import { Typography, Button, Grid, Card } from "@mui/material";
import useStyles from "./MyProfileStyles";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const MyProfile = () => {
  const classes = useStyles();

  const handleEditDetails = () => {};

  return (
    <container className={classes.root}>
      <Typography variant="h6" gutterBottom fontWeight="bold" fontSize="25px">
        My Profile
      </Typography>
      <Grid className={classes.information} container spacing={2}>
        <Card className={classes.personalInfo}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Personal Information
          </Typography>
          <Grid container spacing={2} className={classes.name}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                First Name
              </Typography>
              <Typography variant="body1">Virat</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom fontWeight="bold">
                Last Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                Kohli
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.contact}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Email Address
              </Typography>
              <Typography variant="body1">viratkohli18@gmail.com</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography variant="body1">+91-9876543210</Typography>
            </Grid>
          </Grid>
        </Card>

        <Card className={classes.addressInfo}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Address
          </Typography>
          <Grid container spacing={2} className={classes.countryState}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Country
              </Typography>
              <Typography variant="body1">India</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                State
              </Typography>
              <Typography variant="body1">New Delhi</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.cityPinCode}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body1">New Delhi</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Pin Code
              </Typography>
              <Typography variant="body1">110011</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Button
        className={classes.editButton}
        variant="contained"
        startIcon={<BorderColorIcon />}
        onClick={handleEditDetails}
      >
        Edit Details
      </Button>
    </container>
  );
};

export default MyProfile;
