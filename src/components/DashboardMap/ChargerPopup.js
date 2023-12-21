import { Box, Button, Chip, Typography, Switch } from '@mui/material';
import React, { useState } from 'react'
// import Ratings from '../Rating';
import { CurrencyRupee } from '@mui/icons-material';
import { Popup } from 'react-leaflet';
import { styled } from '@mui/material/styles';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 59,
    height: 30,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                content: '"AM"',
                margin: '5px',
                left: -1.2
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 28,
        height: 28,
        '&:before': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            content: '"PM"',
            margin: '5px',
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function ChargerPopup({ ele, bookingHandler }) {

    const [showSlot, setShowSlot] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const timeSlotHandler=(e)=>{
        console.log(e);
    } 

    return (
        <Popup>
            <Box>
                {
                    !showSlot ?
                        (<>
                            <Box component='img' sx={{ height: '8rem', width: "16rem", borderRadius: '12px', display: 'flex', justifyContent: 'center' }} alt='Charging Station' src={ele.info.imageUrl[0]}></Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{ele.info.stationName}</Typography>
                                <Chip label="Available" color="success" size="small" variant="contained" />
                            </Box>
                            <Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{ele.info.address}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
                                <Box sx={{ display: 'flex', }}>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Type:{' '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{ele.info.chargerType}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px !important' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Opening Time:  {'   '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{ele.info.start}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex' }} >
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Closing Time:  {'   '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold', }}>{ele.info.end}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                <Box sx={{ display: 'flex' }} >
                                    <CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
                                    <Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
                                        {ele.info.price}
                                    </Typography>
                                </Box>
                            </Box>
                        </>) :
                        (<>
                            <Typography>Select Charging Slot</Typography>

                            <MaterialUISwitch sx={{ mb: 1 }} defaultChecked={(new Date().getHours()) > 12 ? false : true} />

                            <Box sx={{ display: 'grid', gridTemplateColumns: '6rem 6rem 6rem', gridGap: '9px', marginBottom: '2rem' }}>
                                {
                                    ['12:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00', '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00'].map((ele) => {
                                        return <Chip size='small'  onClick={timeSlotHandler} label={ele} variant="outlined" />
                                    })
                                }
                            </Box>
                        </>)
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 1 }}>
                    <Button type='button' onClick={(e) => {
                        if (showSlot) {
                            bookingHandler({ ...ele, start, end });
                            setShowSlot(false);
                            setStart(null);
                            setEnd(null);
                        } else {
                            setShowSlot(true);
                        }
                    }
                    } variant="contained" sx={{
                        backgroundColor: '#FCDD13', color: '#292929', fontSize: '11px', fontFamily: 'Manrope !important',
                        textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', padding: '0px 10px',
                    }}>{showSlot ? "Book now" : "Select Slot"}</Button>
                </Box>
            </Box>
        </Popup>
    )
}