import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MyProfile from "./My Profile/MyProfile";
import MyChargers from "./MyChargers";
import Payments from "./Payments";
import Settings from "./Settings";
import Support from "./Support";
import { useStyles } from "./styles";
import { Bolt as BoltIcon } from "@mui/icons-material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DockRoundedIcon from "@mui/icons-material/DockRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Profile = ({ logout, direction }) => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const classes = useStyles();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    logout(); 
  };

  return (
    <motion.Box
      key="pr"
      initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.25, delay: 0 }}
      className={classes.root}
    >
      <Box className={classes.container}>
        <Box className={classes.sidebox}>
          <BoltIcon className={classes.boltIcon} />
          <Box className={classes.profilePictureContainer}>
            <Box className={classes.profileGreet}>
              <Avatar
                alt="Profile Picture"
                src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                className={classes.profilePicture}
              />
              <Box className={classes.greet}>
                <Typography
                  className={classes.hello}
                  variant="h6"
                  gutterBottom
                >
                  Hello,
                </Typography>
                <Typography
                  className={classes.name}
                  variant="h6"
                  gutterBottom
                >
                  Virat Kohli
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className={classes.outerBox}>
            <Box className={classes.buttonGroup}>
              {[
                { tab: "My Profile", icon: <PersonRoundedIcon /> },
                { tab: "My Chargers", icon: <DockRoundedIcon /> },
                { tab: "Payments", icon: <AccountBalanceWalletRoundedIcon /> },
                { tab: "Settings", icon: <SettingsRoundedIcon /> },
                { tab: "Support", icon: <SupportAgentRoundedIcon /> },
                { tab: "Logout", icon: <LogoutRoundedIcon /> },
              ].map(({ tab, icon }) => (
                <Box
                  key={tab}
                  className={`${classes.button} ${
                    activeTab === tab ? classes.activeButton : ""
                  }`}
                  onClick={() =>
                    tab === "Logout" ? handleLogout() : handleTabChange(tab)
                  }
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
          </Box>
        </Box>

        <Box className={classes.information}>
          <Box className={classes.tabContent}>
            {activeTab === "My Profile" && <MyProfile />}
            {activeTab === "My Chargers" && <MyChargers />}
            {activeTab === "Payments" && <Payments />}
            {activeTab === "Settings" && <Settings />}
            {activeTab === "Support" && <Support />}
          </Box>
        </Box>
      </Box>
    </motion.Box>
  );
};

export default Profile;
