import { Box, Button, Chip, Typography, Switch } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { CurrencyRupee } from '@mui/icons-material';
import { Popup } from 'react-leaflet';
import { styled } from '@mui/material/styles';
import { decimalToBinary } from '../../utils/auth/user';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 30,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(28px)',
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
        width: 29,
        height: 29,
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
    var count=0;

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
        for (let i = 0; i < 24; i++) {
            if (binaryTime[i] === '1' && i === intTime) {
                
                return { disable: true, booked: true };
            }
        }
        return { disable: false, booked: false };
    }

    const timing = [
        '12:00-1:00', '1:00-2:00', '2:00-3:00',
        '3:00-4:00', '4:00-5:00', '5:00-6:00', '6:00-7:00',
        '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00',
        '11:00-12:00'
    ];

   

    const timeSlotHandler = (e) => {
        const time = e.target.innerText.split('-');
        if (start === (parseInt(time[1]) - 1) + " " + AMPM) {
            setStart(null);
        } else {
            setStart((parseInt(time[1]) - 1) + " " + AMPM);
        }
    }
    console.log("Charger time: ");
    console.log("count: ",count);

    return (
        <Popup>
            <Box>
                {
                    !showSlot ? (
                        <Fragment>
                            <Box component='img' sx={{ height: '8rem', width: "17rem", borderRadius: '12px', marginLeft: '0rem',display: 'flex', justifyContent: 'center', alignItems:'center' }} alt='Charging Station' src={chargerData.info.imageUrl[0]}></Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#454242', margin: '0px !important', marginTop: '0.5px !important' }}>{chargerData.info.stationName}</Typography>
                                <Chip label="Available" color="success" size="small" variant="contained" sx={{marginTop: "0.2rem"}}/>
                            </Box>
                            
                            <Box sx={{ display: 'flex'}}>
                                <Typography sx={{ fontSize: '16px', color: '#797575',fontWeight: 'bold', margin: '0px !important', marginTop: '0.5px !important'  }}>{chargerData.info.address}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex'}}>
                                    <Typography sx={{ fontSize: '.80rem' ,margin: '0px !important'}}>Type:{'\u00A0\u00A0'}</Typography>
                                    <Typography sx={{ fontSize: '.80rem', fontWeight: 'bold',margin: '0px !important' }}>{chargerData.info.chargerType}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{display:'flex'}}>
                                <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Timing:  {'\u00A0\u00A0'}</Typography>
                                <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{chargerData.info.start > 12 ? parseInt(chargerData.info.start)-12 : chargerData.info.start}:00 {chargerData.info.start > 12 ? "PM" : "AM"} - {chargerData.info.end > 12 ? parseInt(chargerData.info.end)-12 : chargerData.info.end}:00 {chargerData.info.end > 12 ? "PM" : "AM"}</Typography>
                            </Box> 
                                                      
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                <Box sx={{ display: 'flex' }} >
                                <Typography sx={{ fontSize: '0.80rem', margin: '0px !important' }}>Price : {' '}</Typography>
                                    <CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
                                    <Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
                                        {chargerData.info.price}
                                    </Typography>
                                
                                </Box>
                                <Box sx={{display: 'flex'}}>
                                    <Typography sx={{ fontSize: '0.80rem', margin: '0px !important' }}>{
                                             timing.forEach((time) => {
                                                for (let i = 0; i < 2; i++){
                                                    const { disable } = checkDisabled(`${time}-${i === 0 ? 'AM' : 'PM'}`);
                                                    if (!disable) {
                                                        count = count + 1;
                                                    }
                                                }
                                            })
                                    } <br/>{count} Available slots</Typography>
                                </Box> 
                            </Box>
                        </Fragment>
                    )
                        :
                        (
                            <Fragment>
                                <Box sx={{Display:'flex', marginLeft:'3.5rem'}}>
                                     <Typography sx={{fontWeight:'bold'}}>Select Charging Slot</Typography>
                                </Box>
                                <MaterialUISwitch sx={{ mb: 1 }} defaultChecked={(new Date().getHours()) > 12 ? false : true} onChange={(e) => {
                                    e.target.checked ? setAMPM('AM') : setAMPM('PM');
                                }} />

                                <Box sx={{ display: 'grid', gridTemplateColumns: '5.5rem 5.5rem 5.5rem', gridGap: '7px', marginBottom: '2rem' }}>
                                    {
                                        timing.map((time, idx) => {
                                            const { disable, booked } = checkDisabled(time);
                                          
                                            return <Chip key={idx} size='small' onClick={(e) => timeSlotHandler(e)}
                                                disabled={disable} color={start === idx + " " + AMPM ? "success" : booked ? "primary" : "default"} label={time} variant={(start === idx + " " + AMPM) || (booked) ? "filled" : "outlined"} />
                                        })
                                    }
                                </Box>
                            </Fragment>
                        )
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 1 }}>
                    <Button type='button' onClick={(e) => {
                        if (showSlot) {
                            bookingHandler(start.split(" ")[0] === 0 ? 12 : start.split(" ")[0], AMPM, chargerData);
                            setShowSlot(false);
                            setStart(null);
                        } else {
                            setShowSlot(true);
                        }
                    }
                    } variant="contained" sx={{height:'2rem', width:'20rem',
                        backgroundColor: '#FCDD13', color: '#000000', fontSize: '13px', fontFamily: 'Manrope !important',
                        textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '20px', padding: '0px 10px'
                    }}>{showSlot ? "Book now" : "Select Charging Slot"}</Button>
                </Box>
            </Box>
        </Popup>
    )
}