import React, { useState, Fragment } from 'react'
import { otpStyle } from '../../pages/auths/style';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Chip, Divider, TextField, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const CustomerForm = ({ user, data, classes, theme, changeDataHandler, idType, MenuProps, names, image,
    setImage, handleChange, getStyles }) => {

    // States
    const [searchParams] = useSearchParams();
    const [showPlus, setShow] = useState(searchParams.has("redirectTo") ? true : false);
    const [showInfo, setShowInfo] = useState(true);

    if (showPlus) {
        return (
            <Fragment>
                <Alert sx={{ display: showInfo ? 'flex' : 'none', marginBottom: '2rem' }} onClose={() => { setShowInfo(false) }} severity="info"> You need to register to rent charger.</Alert>
                <Typography style={{ textAlign: 'center', color: '#fff', marginBottom: '0.6rem' }}>Click below to register.</Typography>
                <Button variant="contained" onClick={() => setShow(false)} type="button" sx={{
                    height: '64px', marginBottom: '2.4rem', backgroundColor: '#ffdf00', ':hover': { backgroundColor: '#e1ad01' }
                }}><Add sx={{ fontSize: '2.8rem', color: '#262626' }} />
                </Button>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <Typography style={{ textAlign: 'center', color: '#fff', }}>Please enter your details.</Typography>
            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined'
                label='Vehicle Company' type='text' name='vehicleManufacturer' value={data.vehicleManufacturer} />
            
            <FormControl fullWidth sx={otpStyle.registerTextfieldStyle} >
                <InputLabel id="types" required>Charger Type</InputLabel>
                <Select sx={{ color: '#fff', }} labelId="types" name='chargingRequirements' value={data.chargingRequirements}
                    label="Charger Type" onChange={changeDataHandler}  >
                    <MenuItem value={'Level 1'}>Level 1</MenuItem>
                    <MenuItem value={'Level 2'}>Level 2</MenuItem>
                    <MenuItem value={'Level 3'}>Level 3</MenuItem>
                </Select>
            </FormControl>

            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='text' label='Vehicle No.' name='vehicleRegistrationNumber' value={data.vehicleRegistrationNumber} />
            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='number' label='Battery Capacity(kWh)' name='batteryCapacity' value={data.batteryCapacity} />
            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='number' label='Mileage' name='mileage' value={data.mileage} />
            <div>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel sx={{
                        color: 'white', '& .MuiInputLabel-root': {
                            color: '#fff !important',
                        }
                    }} >Select ID</InputLabel>
                    <Select
                        sx={{ color: 'white', backgroundColor: '#ffffff26' }}
                        value={idType}
                        onChange={handleChange}
                        input={<OutlinedInput label="Select ID" />}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, idType, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {(idType !== "None") && (idType !== "") &&
                <div style={{ display: 'flex', columnGap: '12px' }}>
                    <input required
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span" sx={{
                            backgroundColor: 'yellowgreen', ':hover': {
                                backgroundColor: 'yellowgreen'
                            }
                        }}>
                            Upload
                        </Button>
                    </label>
                    {image &&
                        <Chip clickable onDelete={() => {
                            setImage(null)
                        }} sx={{ color: 'white', '	.MuiChip-deleteIcon': { color: 'white', ':hover': { color: 'white' } } }} size='medium' label={image.name} variant="outlined" />
                    }
                </div>
            }
            <Button size='large' type='submit' className={classes.sbmtOtp} variant='contained'>Register</Button>
            <Divider className={classes.dividerStyle}>or</Divider>
            <Link to='/previousBooking' style={{ alignSelf: 'center', color: '#fff', textDecoration: 'none', }}>Skip for later</Link>
        </Fragment>
    )
}

export default CustomerForm;