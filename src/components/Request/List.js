import { Done, Close } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './style';
import { convertTimeforUserUI, updateBookedCharger,getORUpdateTimeSlotOFCharger } from '../../utils/auth/user';
import { STATUS_ACCEPTED, STATUS_CANCELED, STATUS_DECLINED, STATUS_CHARGING_COMPLETED } from '../../constants';

const List = ({ data, show }) => {

    // console.log(data?.userData.level2.vehicleRegistrationNumber)
    console.log(data)

    //Styles
    const classes = useStyles();

    const declineBooking = () => {
        updateBookedCharger(data.bookingId, STATUS_DECLINED);
        const unSetDesiredBit = 1 << data.timeSlot;
        const newTiming = unSetDesiredBit ^ data.chargerData.timeSlot;
        getORUpdateTimeSlotOFCharger(data.chargerData.chargerId, newTiming);
    };

    return (
        <Box>
            <Card className={classes.cardStyle}>
                <Box display='flex' flexDirection='row' padding={0.9}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CardMedia component="img"
                            sx={{
                                width: { xs: '5rem', md: '10rem', lg: '10rem' },
                                height: { xs: '5rem', md: '10rem', lg: '10rem' },
                            }}
                            image="/resources/user.png"
                            alt=""
                        />
                    </Box>
                    <Box padding='0.5rem'>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography className={classes.cardName}>
                                {data?.userData?.firstName + ' ' + data?.userData?.lastName}
                            </Typography>
                            <Chip className={classes.cardChip} label={data?.chargerType} size="small" />
                        </Box>
                        <Typography className={classes.charger} >{data?.socketName}</Typography>
                        <Typography sx={{ color: 'antiquewhite', fontSize: '.9rem', fontWeight: '500' }}>{data?.userData.level2.vehicleRegistrationNumber}</Typography>

                        <Typography className={classes.charger}>
                            {convertTimeforUserUI(data?.timeSlot) || <Skeleton width={50} animation="wave" />}
                        </Typography>
                        <Typography className={classes.phone}>Ph&nbsp;:&nbsp;{data?.userData?.phoneNumber}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {show === "pending" ? (
                                <Box className={classes.buttons}>
                                    <Chip className={classes.chipGreen} disabled={data.status === STATUS_ACCEPTED ? true : false}
                                        label={data.status === STATUS_ACCEPTED ? "Accepted" : "Accept"}
                                        onClick={() => {
                                            updateBookedCharger(data.bookingId, STATUS_ACCEPTED);
                                        }}
                                        icon={<Done style={{ color: 'white' }} />}
                                        size='small'
                                    />
                                    <Chip
                                        className={classes.chipRed}
                                        label="Decline" onClick={() => {
                                            updateBookedCharger(data.bookingId, STATUS_DECLINED);
                                            declineBooking();
                                        }}
                                        icon={<Close style={{ color: 'white' }} />}
                                        size='small'
                                    />
                                </Box>
                            ) : (
                                <Chip
                                    sx={{
                                        backgroundColor: data.status === STATUS_DECLINED ? '#cf352e' : '#228b22',
                                        fontFamily: 'Manrope !important',
                                        fontSize: '1rem',
                                    }}
                                    label={(data.status === STATUS_DECLINED && "Declined by Provider") ||
                                        (data.status === STATUS_CANCELED && "Declined by User") || (data.status === STATUS_CHARGING_COMPLETED && "Charging Completed")}
                                    icon={data.status === "Accepted" ? <Done style={{ color: 'white' }} /> : <Close style={{ color: 'white' }} />}
                                    size='small'
                                    color={data.status === "Accepted" ? 'success' : 'error'}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}

export default List;