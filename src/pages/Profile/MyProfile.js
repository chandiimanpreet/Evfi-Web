import React from "react";
import { Typography, Button } from "@mui/material";
import useStyles from "./MyProfileStyles";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const MyProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <div className={classes.personalInfo}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <table className={classes.table}>
          <tr className={classes.tableHeader}>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr>
            <td className={classes.tableCell}>Virat</td>
            <td className={classes.tableCell}>Kohli</td>
          </tr>
          <tr className={classes.tableHeader}>
            <th>Email Address</th>
            <th>Phone Number</th>
          </tr>
          <tr>
            <td className={classes.tableCell}>viratkohli@gmail.com</td>
            <td className={classes.tableCell}>+91-1234567890</td>
          </tr>
        </table>
      </div>

      <div className={classes.addressInfo}>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <table className={classes.table}>
          <tr className={classes.tableHeader}>
            <th>Country</th>
            <th>State</th>
          </tr>
          <tr>
            <td className={classes.tableCell}>India</td>
            <td className={classes.tableCell}>New Delhi</td>
          </tr>
          <tr className={classes.tableHeader}>
            <th>City</th>
            <th>Postal Code</th>
          </tr>
          <tr>
            <td className={classes.tableCell}>New Delhi</td>
            <td className={classes.tableCell}>110011</td>
          </tr>
        </table>
      </div>
      <Button
        className={classes.editButton}
        variant="contained"
        startIcon={<BorderColorIcon />}
      >
        Edit Details
      </Button>
    </div>
  );
};

export default MyProfile;
