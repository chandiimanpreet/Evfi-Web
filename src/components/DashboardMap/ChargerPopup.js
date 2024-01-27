import { Box, Button, Chip, Typography, Switch } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { CurrencyRupee } from '@mui/icons-material';
import { Popup } from 'react-leaflet';
import { styled } from '@mui/material/styles';
import { decimalToBinary } from '../../utils/auth/user';


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

export default function ChargerPopup({ chargerData, bookingHandler }) {

    const [showSlot, setShowSlot] = useState(false);
    const [start, setStart] = useState(null);
    // const [end, setEnd] = useState(null);

    const [AMPM, setAMPM] = useState(new Date().getHours() > 12 ? 'PM' : 'AM');

    const checkDisabled = (time) => {

        let binaryTime = decimalToBinary(chargerData.timeSlot);
        let intTime = parseInt(time.split('-')[0]);
        console.log(intTime);

        if (AMPM === 'PM' && intTime === 12) {
            intTime = 12;
        } else if (AMPM === 'PM' && intTime !== 12) {
            intTime += 12;
        }
        else if (AMPM === 'AM' && intTime === 12) {
            intTime = 0;
        }
<<<<<<< Updated upstream

=======
        if ((intTime >= chargerData.info.start && intTime <= chargerData.info.end) || new Date().getHours()>intTime) {
            return true;
        }
>>>>>>> Stashed changes
        for (let i = 0; i < 24; i++) {
            if (binaryTime[i] === '1' && i === intTime) {
                return true;

            }
        }
        return false;
    }

    const timing = [
        '12:00-1:00', '1:00-2:00', '2:00-3:00',
        '3:00-4:00', '4:00-5:00', '5:00-6:00', '6:00-7:00',
        '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00',
        '11:00-12:00'
    ];

    const timeSlotHandler = (e) => {
        const time = e.target.innerText.split('-');
<<<<<<< Updated upstream
=======
        console.log(parseInt(time[0]));
        console.log(time);
>>>>>>> Stashed changes
        if (start === (parseInt(time[1]) - 1) + " " + AMPM) {
            setStart(null);
        } else {
            setStart((parseInt(time[1]) - 1) + " " + AMPM);
        }
    }

    return (
        <Popup>
            <Box>
                {
                    !showSlot ? (
                        <Fragment>
                            <Box component='img' sx={{ height: '8rem', width: "16rem", borderRadius: '12px', display: 'flex', justifyContent: 'center' }} alt='Charging Station' src={chargerData.info.imageUrl[0]}></Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{chargerData.info.stationName}</Typography>
                                <Chip label="Available" color="success" size="small" variant="contained" />
                            </Box>
                            <Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{chargerData.info.address}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
                                <Box sx={{ display: 'flex', }}>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Type:{' '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{chargerData.info.chargerType}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px !important' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Opening Time:  {'   '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{chargerData.info.start}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex' }} >
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Closing Time:  {'   '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold', }}>{chargerData.info.end}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                <Box sx={{ display: 'flex' }} >
                                    <CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
                                    <Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
                                        {chargerData.info.price}
                                    </Typography>
                                </Box>
                            </Box>
                        </Fragment>
                    )
                        :
                        (
                            <Fragment>
                                <Typography>Select Charging Slot</Typography>

                                <MaterialUISwitch sx={{ mb: 1 }} defaultChecked={(new Date().getHours()) > 12 ? false : true} onChange={(e) => {
                                    e.target.checked ? setAMPM('AM') : setAMPM('PM');
                                }} />

                                <Box sx={{ display: 'grid', gridTemplateColumns: '6rem 6rem 6rem', gridGap: '9px', marginBottom: '2rem' }}>
                                    {
                                        timing.map((time, idx) => {
                                            return <Chip key={idx} size='small' onClick={(e) => timeSlotHandler(e)}
                                                disabled={checkDisabled(time)} color={start === idx + " " + AMPM ? "success" : "default"} label={time} variant={start === idx + " " + AMPM ? "filled" : "outlined"} />
                                        })
                                    }
                                </Box>
                            </Fragment>
                        )
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 1 }}>
                    <Button type='button' onClick={(e) => {
                        if (showSlot) {
<<<<<<< Updated upstream
                            // console.log(start.split(" ")[0])
=======
>>>>>>> Stashed changes
                            bookingHandler(start.split(" ")[0] === 0 ? 12 : start.split(" ")[0], AMPM, chargerData);
                            setShowSlot(false);
                            setStart(null);
                        } else {
                            setShowSlot(true);
                        }
                    }
                    } variant="contained" sx={{
                        backgroundColor: '#FCDD13', color: '#292929', fontSize: '11px', fontFamily: 'Manrope !important',
                        textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', padding: '0px 10px',
                    }}>{showSlot ? "Book now" : "Select Charging Slot"}</Button>
                </Box>
            </Box>
        </Popup>
    )
}