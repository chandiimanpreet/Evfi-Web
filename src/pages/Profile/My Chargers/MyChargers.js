import React from 'react';
import { Typography, Box, Skeleton } from '@mui/material';
import { decimalToBinary } from '../../../utils/auth/user';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import useStyles from './styles';

const convertTimeforUserUI = (timeSlot) => {

    let time = decimalToBinary(timeSlot);
    time = time.length > 0 ? time : 0;
    let greaterThan12 = false;

    for (let i = 0; i < time.length; i++) {
        if (time[i] === '1') {
            time = i;
        }
    }

    if (time >= 12) {
        time = time - 12;
        greaterThan12 = true;
    }

    time = `${time === 0 ? 12 : time}:00 - ${(time + 1)}:00`.concat(greaterThan12 ? ' PM' : ' AM');
    return time;
}

const MyChargers = ({ user, chargers, setActivePage }) => {
    const classes = useStyles();

    const uniqueChargerIds = new Set();
    
    const charger = chargers.find(charger => {
        if (!uniqueChargerIds.has(charger.chargerId) && charger.chargerId === user.chargers[0]) {
            uniqueChargerIds.add(charger.chargerId);
            return true;
        }
        return false;
    });
    console.log(charger);

    const handleBackButton = () => {
        setActivePage(false);

    };


    return (
        <Box sx={{ width: { xs: "90vw", md: "41rem", lg: "50rem" } }}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <ArrowBackIcon onClick={handleBackButton} sx={{ color: 'white', display: { xs: 'block', md: 'none' } }} />
                <Typography variant="h5" margin="0 1rem" gutterBottom fontWeight="bold" fontSize="25px" fontFamily="Manrope"
                    color={"white"}>
                    My Chargers
                </Typography>
            </Box>

            <br />

            <Box className={classes.listItemStyle} sx={{
                paddingBottom: ['0rem', '0.6rem'], justifyContent: {xs: 'center', md: 'flex-start'}, display: 'flex'
            }}>
                <Box display='flex'>
                    <Box component='img' sx={{ height: { xs: "8.5rem", md: "9rem" }, width: { xs: "7rem",sm:"10rem", md: "10rem" }, borderRadius: '10px 0px 0px 10px', }}
                        alt='Charging Station' src={charger?.info?.imageUrl[0]}>
                    </Box>

                    <Box sx={{ width: ['11.2rem', '12rem', '20rem'] }} className={classes.listItemCardStyle}>
                        <Typography sx={{ fontSize: { xs: '0.85rem', md: '1.05rem' }, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{charger?.info?.stationName}
                        </Typography>

                        <Box>
                            <Typography whiteSpace='initial' className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                                {charger?.info?.address || <Skeleton width={250} animation="wave" />}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="flex-start">
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Type:</Typography>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
                                {charger?.info?.chargerType || <Skeleton width={20} animation="wave" />}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="flex-start">
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Price:</Typography>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
                                {charger?.info?.price || <Skeleton width={20} animation="wave" />}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="flex-start">
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Slot:</Typography>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
                                {convertTimeforUserUI(charger?.timeSlot) || <Skeleton width={50} animation="wave" />}
                            </Typography>
                        </Box>


                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyChargers;
