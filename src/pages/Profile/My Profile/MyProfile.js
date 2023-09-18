import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, Card, CardContent } from "@mui/material";
import useStyles from "./styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RenderInformation from "./RenderInformation";
import { registerUser } from '../../../utils/auth/user';

const MyProfile = ({ user }) => {

    //States
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        state: user.state,
        city: user.city,
        pinCode: user.pinCode,
    });

    //Styles
    const classes = useStyles();

    //Handlers
    const handleEditDetails = () => {
        setIsEditing(true);
    };

    const handleSaveDetails = () => {
        setIsEditing(false);
    };

    const handleChange = (field, value) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (isEditing) {
            registerUser({
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                country: profile.country,
                state: profile.state,
                city: profile.city,
                pinCode: profile.pinCode,
            });

        }
    }, [isEditing, profile]);

    return (
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom fontWeight="bold" fontSize="25px" fontFamily='Manrope'
                color={"white"}            >
                My Profile
            </Typography>
            <br />
            <Grid className={classes.container} container spacing={2}>
                <Card className={classes.infoCard}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Personal Information
                        </Typography>
                        <br />
                        <Grid container spacing={2}>
                            <RenderInformation field="firstName" label="First Name" value={profile.firstName}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="lastName" label="Last Name" value={profile.lastName}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="email" label="Email" value={profile.email}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="PhoneNumber" label="Phone Number" value={profile.phoneNumber}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                        </Grid>
                    </CardContent>
                </Card>

                <Card className={classes.infoCard}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Address
                        </Typography>
                        <br />
                        <Grid container spacing={2} className={classes.content}>
                            <RenderInformation field="country" label="Country" value={profile.country}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="state" label="State" value={profile.state}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="city" label="City" value={profile.city}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                            <RenderInformation field="pinCode" label="Pin Code" value={profile.pinCode}
                                isEditing={isEditing} handleChange={handleChange}
                            />
                        </Grid>
                    </CardContent>
                </Card>
                <Button className={classes.editButton} variant="contained" startIcon={<BorderColorIcon />}
                    onClick={isEditing ? handleSaveDetails : handleEditDetails}
                >
                    {isEditing ? "Save Details" : "Edit Details"}
                </Button>
            </Grid>
        </div>
    );
};

export default MyProfile;