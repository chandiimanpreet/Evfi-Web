import { Done, Close } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import { updateCharger, getParticularUser } from '../../utils/auth/user';

const List = ({ data, show, user }) => {
   
    // States
    const [requestedUserData, setRequestedUserData] = useState(null);

    //Styles
    const classes = useStyles();

    // Handlers
    const fetchData = async () => {
        console.log(data);
        const res = await getParticularUser(data.uId, data.chargerId);
        setRequestedUserData(res);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

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
                            <Typography className={classes.cardName} variant="h6"  >
                                {requestedUserData?.user?.firstName + ' ' + requestedUserData?.user?.lastName}
                            </Typography>
                            <Chip className={classes.cardChip} label={requestedUserData?.charger?.info?.chargerType} size="small" />
                        </Box>
                        <Typography className={classes.charger} >{data?.socketName}</Typography>
                        <Typography className={classes.charger}>
                            {data?.timeSlot}&nbsp;|&nbsp;
                        </Typography>
                        <Typography className={classes.phone}>Ph&nbsp;:&nbsp;{requestedUserData?.user?.phoneNumber}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {show === "pending" ? (
                                <Box className={classes.buttons}>
                                    <Chip className={classes.chipGreen}
                                        label={data.status === 2 ? "Accepted" : "Accept"}
                                        onClick={() => {
                                            updateCharger(data.bookingId, 2)
                                        }}
                                        icon={<Done style={{ color: 'white' }} />}
                                        size='small'
                                    />
                                    <Chip
                                        className={classes.chipRed}
                                        label="Decline" onClick={() => {
                                            updateCharger(data.bookingId, -1);
                                        }}
                                        icon={<Close style={{ color: 'white' }} />}
                                        size='small'
                                    />
                                </Box>
                            ) : (
                                <Chip
                                    sx={{
                                        backgroundColor: data.status === -1 ? '#cf352e': '#228b22',
                                        fontFamily: 'Manrope !important',
                                        fontSize: '1rem',
                                        marginRight: '5rem',
                                    }}
                                    label={(data.status === -1 && "Declined by Provider") || (data.status === -2 && "Declined by User")}
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