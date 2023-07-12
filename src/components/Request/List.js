import { Done, Close } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from './style'


export default function List({ data, show }) {

    //Styles
    const classes = useStyles();

    return (
        <Box>
            <Card className={classes.cardStyle}>
                <CardMedia
                    component="img"
                    sx={{ width: 138, height: "fit-content", marginTop: '2rem', marginLeft: "0.5rem" }}
                    image="/resources/user.png"
                    alt=""
                />
                <CardContent sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', marginBottom: '0.3rem' }}>
                        <Typography className={classes.cardName} variant="h6" >
                            {data.name}
                        </Typography>
                        <Chip className={classes.cardChip} label={data.chargerType} size="small" />
                    </Box>
                    <Typography className={classes.charger} sx={{ width: '80%', }} >{data.socketName}</Typography>
                    <Typography className={classes.charger}>
                        {data.slot}&nbsp;|&nbsp;{data.date}
                    </Typography>
                    <Typography className={classes.phone}>Ph&nbsp;:&nbsp;{data.phone}</Typography>
                    <Box sx={{ display: 'flex' }}>
                        {show === "pending" ?
                            <Box>
                                <Chip className={classes.chipGreen} label="Accept"
                                    onClick={() => console.log("accepted")} icon={<Done style={{ color: 'white' }} />}
                                    size='medium'
                                />
                                <Chip className={classes.chipRed} label="Decline"
                                    onClick={() => console.log("declined")} icon={<Close style={{ color: 'white' }} />}
                                    size='medium'

                                />
                            </Box>
                            :
                            <Chip
                                sx={{ backgroundColor: data.status === "Accepted" ? '#228b22' : '#cf352e', fontFamily: 'Manrope !important', fontSize: '1rem', }}
                                label={data.status === "Accepted" ? "Accepted" : "Declined"}
                                icon={data.status === "Accepted" ? <Done style={{ color: 'white' }} /> : <Close style={{ color: 'white' }} />}
                                size='medium'
                                color={data.status === "Accepted" ? 'success' : 'error'}
                            />}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
