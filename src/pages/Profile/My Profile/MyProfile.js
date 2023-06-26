import React, { useState } from "react";
import { Typography, Button, Grid, TextField, CardContent } from "@mui/material";
import useStyles from "./MyProfileStyles";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const MyProfile = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Virat");
  const [lastName, setLastName] = useState("Kohli");
  const [email, setEmail] = useState("viratkohli18@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+91-9876543210");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("New Delhi");
  const [city, setCity] = useState("New Delhi");
  const [pinCode, setPinCode] = useState("110011");

  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleSaveDetails = () => {
    setIsEditing(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom fontWeight="bold" fontSize="25px">
        My Profile
      </Typography>
      <br />
      <Grid className={classes.information} container spacing={2}>
        <CardContent className={classes.personalInfo}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Personal Information
          </Typography>
          <Grid container spacing={2} className={classes.name}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                First Name
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={firstName}
                  disabled={!isEditing}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom fontWeight="bold">
                Last Name
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={lastName}
                  disabled={!isEditing}
                />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.contact}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Email Address
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={email}
                  disabled={!isEditing}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Phone Number
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={phoneNumber}
                  disabled={!isEditing}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>

        <CardContent className={classes.addressInfo}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Address
          </Typography>
          <Grid container spacing={2} className={classes.countryState}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Country
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={country}
                  disabled={!isEditing}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                State
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={state}
                  disabled={!isEditing}
                />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.cityPinCode}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                City
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={city}
                  disabled={!isEditing}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Pin Code
              </Typography>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={pinCode}
                  disabled={!isEditing}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
      {isEditing ? (
        <Button
          className={classes.editButton}
          variant="contained"
          startIcon={<BorderColorIcon />}
          onClick={handleSaveDetails}
        >
          Save Details
        </Button>
      ) : (
        <Button
          className={classes.editButton}
          variant="contained"
          startIcon={<BorderColorIcon />}
          onClick={handleEditDetails}
        >
          Edit Details
        </Button>
      )}
    </div>
  );
};

export default MyProfile;
