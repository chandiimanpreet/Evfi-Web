import React, { useState } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MyProfile from "./My Profile/MyProfile";
import MyChargers from "./My Chargers/MyChargers";
import Payments from "./Payments/Payments";
import Settings from "./Settings/Settings";
import Support from "./Support/Support";
import { useStyles } from "./styles";
import {
    PersonRounded, DockRounded, AccountBalanceWalletRounded, SettingsRounded,
    SupportAgentRounded, LogoutRounded
} from "@mui/icons-material";
import { connect } from "react-redux";
import { logout } from "../../actions";

const Profile = ({ direction, logoutUser, userData, chargers }) => {

    // States
    const [activeTab, setActiveTab] = useState("My Profile");
    const [activePage, setActivePage] = useState(false);

    // Styles
    const classes = useStyles();

    // Handlers
    const handleTabChange = (tab) => {
        setActivePage(true);
        setActiveTab(tab);
    };

    const handleLogout = () => {
        logoutUser();
    };

    console.log(userData.user);

    return (
        <motion.Box key="pr" initial={{ x: direction }} animate={{ x: 0 }}
            transition={{ duration: 0.25, delay: 0 }} className={classes.root}
        >
            <Box sx={{ gap: { md: "2rem", lg: "7.5rem" }, paddingTop: { xs: "1.5rem", md: "2rem", lg: "3rem" }, display: 'flex' }}>
                <Box className={classes.sidebox} sx={{ display: { xs: activePage ? "none" : "block", md: "block" }, width: { xs: '17rem', md: '15rem' } }}>
                    <Card className={classes.profilePictureContainer}>
                        <Box className={classes.profileGreet} sx ={{gap: {xs: '1.5rem', md: '0.5rem' }}}>
                            <Avatar alt="Profile Picture" className={classes.profilePicture}
                                src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            />
                            <Box display='flex' flexDirection='column' justifyContent='center' >
                                <Typography fontSize='100%' color='white' gutterBottom>
                                    Hello,
                                </Typography>
                                <Typography fontWeight='bold' fontSize='100%' color='white'>
                                    {
                                        userData.user.firstName !== undefined && userData.user.lastName !== undefined
                                            ? userData.user.firstName : ""
                                    }
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
                                <Box
                                    key={tab}
                                    sx={{
                                        backgroundColor: activeTab === tab ? { xs: '', md: '#181818' } : {},
                                    }}
                                    height= '4rem'
                                    onClick={() => (tab === "Logout" ? handleLogout() : handleTabChange(tab))}
                                >
                                    <Box sx={{ marginLeft: { xs: '4rem', md: '2rem' } }} className={classes.buttonName}>
                                        {icon && (
                                            <Typography className={classes.buttonIcon}>
                                                {icon}
                                            </Typography>
                                        )}
                                        &nbsp; &nbsp; &nbsp; {tab}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Box>
                <Box sx={{ display: { xs: activePage ? "block" : "none", md: "block" } }} >
                    {activeTab === "My Profile" && <MyProfile user={userData.user} setActivePage={setActivePage} />}
                    {activeTab === "My Chargers" && <MyChargers  user={userData.user} setActivePage={setActivePage} />}
                    {activeTab === "Payments" && <Payments setActivePage={setActivePage} />}
                    {activeTab === "Settings" && <Settings setActivePage={setActivePage} />}
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