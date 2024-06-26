import React from 'react';
import { Typography, Box, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


import useStyles from './styles';
import { styled } from '@mui/material/styles';

const MyChargers = ({ user, chargers, setActivePage }) => {
    const classes = useStyles();

    const chargerId = user.chargers[0] ? user.chargers[0] : false;
    const charger = chargerId ? chargers.find(charger => charger.chargerId === chargerId) : null;

    const handleBackButton = () => {
        setActivePage(false);

    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 32, // Decreased width
        height: 20, // Decreased height
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(12px)', // Adjusted transformation for smaller size
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '4px solid #fff', // Adjusted border for smaller thumb
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16, // Decreased thumb width
            height: 16, // Decreased thumb height
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2, // Adjusted radius for new height
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

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

            {charger && (<Box className={classes.listItemStyle} sx={{
                paddingBottom: ['0rem', '0.6rem'], justifyContent: { xs: 'center', md: 'flex-start' }, display: 'flex'
            }}>
                <Box display='flex'>
                    <Box component='img' sx={{ height: { xs: "8.5rem", md: "9rem" }, width: { xs: "7rem", sm: "10rem", md: "10rem" }, borderRadius: '10px 0px 0px 10px', }}
                        alt='Charging Station' src={charger?.info?.imageUrl[0]}>
                    </Box>

                    <Box sx={{ width: ['11.2rem', '12rem', '20rem'] }} className={classes.listItemCardStyle}>
                        <Typography sx={{ fontSize: { xs: '0.85rem', md: '1.05rem' }, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{charger?.info?.stationName}
                        </Typography>

                        <Box>
                            <Typography whiteSpace='initial' className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                                {charger?.info?.address || <Skeleton width={250} animation="wave" />}</Typography>
                        </Box>

                        <Box display="flex" gap={5}>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Slot:</Typography>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
                                {<Skeleton width={50} animation="wave" />}
                            </Typography>
                        </Box>

                        <Box display="flex" gap={5}>
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
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Availability:
                            </Typography>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ mx: 1 }} defaultChecked />}
                                sx={{ fontSize: { xs: '0.5rem', md: '0.2rem' }, fontWeight: "bold", color: '#fff' }}
                            />
                        </Box>

                    </Box>
                </Box>
            </Box>)}
            {!charger && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography sx={{ color: '#b5b3b3', fontSize: '1.2rem', fontWeight: 'bold' }}>You have no chargers.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default MyChargers;

