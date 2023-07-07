import React, { useState } from "react";
import { Typography, Button, Grid, Card, CardContent } from "@mui/material";
import useStyles from "./styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RenderInformation from "./RenderInformation";

const MyProfile = () => {

    //States
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "Virat", lastName: "Kohli", email: "viratkohli18@gmail.com",
        phoneNumber: "+91-9876543210", country: "India", state: "New Delhi", city: "New Delhi",
        pinCode: "110011",
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
                            <RenderInformation field="phoneNumber" label="Phone Number" value={profile.phoneNumber}
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