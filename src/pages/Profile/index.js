import React, { useState } from "react";
import { Button, Avatar, Box } from "@mui/material";
import { motion } from "framer-motion";
import MyProfile from "./MyProfile";
import MyChargers from "./MyChargers";
import Payments from "./Payments";
import Settings from "./Settings";
import Support from "./Support";
import Logout from "./Logout";
import { useStyles } from "./styles";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DockRoundedIcon from '@mui/icons-material/DockRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


const Profile = ({ logout, direction }) => {
  const [activeTab, setActiveTab] = useState("MyProfile");
  const classes = useStyles();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <motion.div
      key="pr"
      initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.25, delay: 0 }}
      className={classes.container}
    >
      <Box className={classes.profilePictureContainer}>
        <Avatar
          alt="Profile Picture"
          src="/path/to/profile-picture.jpg"
          className={classes.profilePicture}
        />
      </Box>
      <div className={classes.outerBox}>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("MyProfile")}
            className={activeTab === "MyProfile" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<AccountCircleRoundedIcon />} 
          >
            My Profile
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("MyChargers")}
            className={activeTab === "MyChargers" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<DockRoundedIcon />}
          >
            My Chargers
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("Payments")}
            className={activeTab === "Payments" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<CurrencyRupeeRoundedIcon />} 
          >
            Payments
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("Settings")}
            className={activeTab === "Settings" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<SettingsRoundedIcon />}
          >
            Settings
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("Support")}
            className={activeTab === "Support" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<SupportAgentRoundedIcon />}
          >
            Support
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleTabChange("Logout")}
            className={activeTab === "Logout" ? classes.activeButton : ""}
            classes={{ root: classes.button }}
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </Button>
        </div>
        <div className={classes.information}>
          <div className={classes.tabContent}>
            {activeTab === "MyProfile" && <MyProfile />}
            {activeTab === "MyChargers" && <MyChargers />}
            {activeTab === "Payments" && <Payments />}
            {activeTab === "Settings" && <Settings />}
            {activeTab === "Support" && <Support />}
            {activeTab === "Logout" && <Logout logout={logout} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
