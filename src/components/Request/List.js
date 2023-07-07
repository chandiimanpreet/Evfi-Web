import { Done, Close } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import React from 'react'


export default function List({ data, show }) {
    return (
        <Box>
            <Card sx={{
                paddingX: '0.4rem',
                minWidth: 438, display: 'flex', boxShadow: '5px 0 5px 0 rgba(0,0,0,0.5)',
                "backdropFilter": "blur(19px) saturate(132%)", "WebkitBackdropFilter": "blur(19px) saturate(132%)", "backgroundColor": "rgba(120, 121, 142, 0.45)", "borderRadius": "12px", "border": "1px solid rgba(209, 213, 219, 0.3)"
            }}>
                <CardMedia
                    component="img"
                    sx={{ width: 138, height: "fit-content", marginTop: '2rem', marginLeft: "0.5rem" }}
                    image="/resources/user.png"
                    alt=""
                />
                <CardContent sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', marginBottom: '0.3rem' }}>
                        <Typography sx={{ width: '85%', color: 'antiquewhite', fontFamily: 'Manrope', fontWeight: 'bold', }} variant="h6" component="div">
                            {data.name}
                        </Typography>
                        <Chip sx={{ alignSelf: 'center', backgroundColor: "white", filter: "opacity(95%)", color: 'black', fontFamily: 'Manrope', fontWeight: 'bold' }} label={data.chargerType} size="small" />
                    </Box>
                    <Typography sx={{ fontSize: 14, width: '80%', marginBottom: '0.3rem', color: 'antiquewhite', fontFamily: 'inter', }}>
                        {data.socketName}
                    </Typography>
                    <Typography sx={{ fontSize: 13, marginBottom: '0.3rem', color: 'antiquewhite', fontFamily: 'inter', }}>
                        {data.slot}&nbsp;|&nbsp;{data.date}
                    </Typography>
                    <Typography sx={{ width: '80%', color: 'antiquewhite', fontSize: 13, marginBottom: '1.6rem', fontFamily: 'inter', }} >
                        Ph&nbsp;:&nbsp;{data.phone}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        {show === "pending" ?
                            <Box>
                                <Chip
                                    sx={{ marginRight: '1rem', backgroundColor: '#228b22', color: 'white', fontFamily: 'Manrope', fontSize: '1rem', "&:hover": { backgroundColor: '#228b22' } }}
                                    label="Accept" onClick={() => console.log("accepted")} icon={<Done style={{ color: 'white' }} />}
                                    size='medium'
                                />
                                <Chip
                                    sx={{ backgroundColor: '#cf352e', color: 'white', fontFamily: 'Manrope', fontSize: '1rem', "&:hover": { backgroundColor: '#cf352e' } }}
                                    label="Decline" onClick={() => console.log("declined")} icon={<Close style={{ color: 'white' }} />}
                                    size='medium'

                                />
                            </Box>
                            :
                            <Chip
                                sx={{ backgroundColor: data.status === "Accepted" ? '#228b22' : '#cf352e', fontFamily: 'Manrope', fontSize: '1rem', }}
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
