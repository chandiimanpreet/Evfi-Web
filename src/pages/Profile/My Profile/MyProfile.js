import React, { useState,  } from "react";
import { Typography, Button, Grid, Card, Box } from "@mui/material";
import useStyles from "./styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RenderInformation from "./RenderInformation";
import {  updateUser } from '../../../utils/auth/user';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { connect } from "react-redux";
import { updateuserProfile } from "../../../actions";

const MyProfile = ({ user, setActivePage, updateProfileAction }) => {

    //States
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
        state: user.state || '',
        city: user.city || '',
        pinCode: user.pinCode || '',
    });
    console.log(profile);
    //Styles
    const classes = useStyles();

    //Handlers
    const handleEditDetails = () => {
        setIsEditing(true);
    };
    console.log(user)
    const handleSaveDetails = async () => {
        setIsEditing(false);

        try {
            await updateUser(user.uid, profile);
        } catch (err) {
            console.log(err);
        }
        updateProfileAction(profile);
    };

    const handleBackButton = () => {
        console.log("click")
        setActivePage(false);

    };

    const handleChange = (field, value) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [field]: value,
        }));
    };

    return (
        <Box sx={{ width: { xs: "93vw", md: "41rem", lg: "50rem" }, height: { xs: "41rem", md: "38rem", lg: "38rem" }, overflow: { xs: 'auto', sm: 'hidden' } }} className={classes.main}>
            <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: { xs: "flex-start", sm: "space-between" } }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <ArrowBackIcon onClick={handleBackButton} sx={{ color: 'white', display: { xs: 'block', md: 'none' } }} />
                    <Typography variant="h5" margin="0 1rem" gutterBottom fontWeight="bold" fontSize="25px" fontFamily='Manrope' color={"white"}>
                        My Profile
                    </Typography>
                </Box>
                <Button sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "row" }} className={classes.editButton} variant="contained" startIcon={<BorderColorIcon />}
                    onClick={isEditing ? handleSaveDetails : handleEditDetails}
                >
                    {isEditing ? "Save Details" : "Edit Details"}
                </Button>
            </Grid>

            <br />

            <Box className={classes.container} >
                <Card className={classes.infoCard}>
                    <Box >
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Personal Information
                        </Typography>
                        <br />
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6} >
                                <RenderInformation field="firstName" label="First Name" value={profile.firstName}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="lastName" label="Last Name" value={profile.lastName}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="email" label="Email" value={profile.email}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="phoneNumber" label="Phone Number" value={profile.phoneNumber}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Card>

                <Card className={classes.infoCard}>
                    <Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Address
                        </Typography>
                        <br />
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="country" label="Country" value={profile.country}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="state" label="State" value={profile.state}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="city" label="City" value={profile.city}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderInformation field="pinCode" label="Pin Code" value={profile.pinCode}
                                    isEditing={isEditing} handleChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Button sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "row" }} className={classes.editButton} variant="contained" startIcon={<BorderColorIcon />}
                    onClick={isEditing ? handleSaveDetails : handleEditDetails}
                >
                    {isEditing ? "Save Details" : "Edit Details"}
                </Button>
                <br />
            </Box>
        </Box>
    );
};



const mapDispatchFromProps = dispatch => ({
    updateProfileAction: (data) => dispatch(updateuserProfile(data))
})

export default connect(null, mapDispatchFromProps)(MyProfile);
