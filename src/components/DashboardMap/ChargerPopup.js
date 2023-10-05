import { Box, Button, Chip, Typography } from '@mui/material';
import React, { useState } from 'react'
import Ratings from '../Rating';
import { CurrencyRupee } from '@mui/icons-material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Popup } from 'react-leaflet';

export default function ChargerPopup({ ele, bookingHandler }) {

    const [showSlot, setShowSlot] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    return (
        <Popup>
            <Box>
                {
                    !showSlot ?
                        (<>
                            <Box component='img' sx={{ height: 150, width: 300, borderRadius: '15px' }} alt='Charging Station' src={ele.info.imageUrl[0]}></Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{ele.info.stationName}</Typography>
                                <Chip label="Available" color="success" size="small" variant="contained" />
                            </Box>
                            <Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{ele.info.address}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
                                <Box sx={{ display: 'flex', }}>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Charging Type:{' '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{ele.info.chargerType}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex' }} >
                                    <Typography sx={{ fontSize: '.75rem', margin: '0px !important', }}>Ratings{' '}</Typography>
                                    <Ratings rating={4} />
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
                                        <TimePicker
                                            label="Start Time"
                                            value={start}
                                            onChange={(newValue) => setStart(newValue)}
                                        />
                                        <TimePicker
                                            label="End Time"
                                            value={end}
                                            onChange={(newValue) => setEnd(newValue)}
                                        />
                                    </Box>
                                </DemoContainer>
                            </LocalizationProvider>
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
