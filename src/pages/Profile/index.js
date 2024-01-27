import React, { useState } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MyProfile from "./My Profile/MyProfile";
import MyChargers from "./MyChargers";
import Payments from "./Payments/Payments";
import Settings from "./Settings/Settings";
import Support from "./Support";
import { useStyles } from "./styles";
import { PersonRounded, DockRounded, AccountBalanceWalletRounded, SettingsRounded, SupportAgentRounded, LogoutRounded } from "@mui/icons-material";
import { connect } from "react-redux";
import { logout } from "../../actions";

const Profile = ({ direction, logoutUser, userData }) => {

    // States
    const [activeTab, setActiveTab] = useState("My Profile");

    // Styles
    const classes = useStyles();

    // Handlers
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <motion.Box key="pr" initial={{ x: direction }} animate={{ x: 0 }}
            transition={{ duration: 0.25, delay: 0 }} className={classes.root}
        >
            <Box className={classes.container}>
                <Box className={classes.sidebox}>
                    <Card className={classes.profilePictureContainer}>
                        <Box className={classes.profileGreet}>
                            <Avatar alt="Profile Picture" className={classes.profilePicture}
                                src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            />
                            <Box className={classes.greet}>
                                <Typography className={classes.hello} variant="h6" gutterBottom color={"#ffffff"}>
                                    Hello,
                                </Typography>
                                <Typography className={classes.name} variant="h6" gutterBottom>
                                    {userData.user.firstName !== undefined ? userData.user.firstName : ""}
                                </Typography>

                            </Box>
                        </Box>
                    </Card>

                    <Card className={classes.outerBox}>
                        <Box className={classes.buttonGroup}>
                            {[
                                { tab: "My Profile", icon: <PersonRounded /> },
                                { tab: "My Chargers", icon: <DockRounded /> },
                                { tab: "Payments", icon: <AccountBalanceWalletRounded /> },
                                { tab: "Settings", icon: <SettingsRounded /> },
                                { tab: "Support", icon: <SupportAgentRounded /> },
                                { tab: "Logout", icon: <LogoutRounded /> },
                            ].map(({ tab, icon }) => (
                                <Box key={tab} className={`${classes.button} ${activeTab === tab ? classes.activeButton : ""}`}
                                    onClick={() => tab === "Logout" ? handleLogout() : handleTabChange(tab)}
                                >
                                    <Typography className={classes.buttonName}>
                                        {icon && (
                                            <Typography className={classes.buttonIcon}>
                                                {icon}
                                            </Typography>
                                        )}
                                        &nbsp; &nbsp; &nbsp; {tab}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Box>
                
                <Box sx={{ display: {xs: 'none', md: 'fixed'}}}>
                    {activeTab === "My Profile" && <MyProfile user={userData.user} />}
                    {activeTab === "My Chargers" && <MyChargers user={userData.user} />}
                    {activeTab === "Payments" && <Payments />}
                    {activeTab === "Settings" && <Settings />}
                    {activeTab === "Support" && <Support />}
                </Box>
            </Box>
        </motion.Box>
    );
};
const mapStateToProps = state => ({
    userData: state.userData
})
const mapDispatchFromProps = dispatch => ({
    logoutUser: () => dispatch(logout())
})
export default connect(mapStateToProps, mapDispatchFromProps)(Profile);
