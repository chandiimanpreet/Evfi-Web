import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

const defaultTheme = createTheme();
export default function Registerauth(props) {
  const navigate = useNavigate();
  const { setData } = props;
  const [data, setUserData] = useState(null);
  const onChange = (e) => {
    setUserData({ ...data, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (localStorage.getItem('registered') === 'true') {
      navigate('/');
    }
  })
  const saveData = () => {
    if (localStorage.getItem('user')) {
      fetch(`https://apifromfb.onrender.com/api/update/Users?id=${localStorage.getItem('user')}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data, registered: true
        })
      })
        .then(() => {
          localStorage.setItem('registered', true)
          navigate('/', { replace: true })
          setData({ ...data, registered: true })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      navigate('/auth');
    }
  }
  return (
    <>
      <motion.div initial={{ x: 2000, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: -2000, transition: { duration: 0.4, delay: 0 } }} transition={{ duration: 1, delay: 0.8 }}>
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <Grid item xs={12} sm={8} md={5} sx={{ backgroundColor: "#212121" }} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ mb: 4, border: 1, borderRadius: 1, p: 1, borderColor: '#ffeb3b', borderWidth: 3 }}>
                  <img style={{ height: '30px', width: '30px' }} alt='' src={require('../../light.png')} />
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography component="h1" variant='h5' style={{ color: 'white', fontWeight: 'bold' }}>Start Your Journey With <span style={{ color: '#ffeb3b' }}>EVFI</span></Typography>
                </Box>
                <Avatar sx={{ m: 1, bgcolor: '#ffeb3b', color: "black" }}>
                  <AccountCircleIcon fontSize='large' />
                </Avatar>

                <Box sx={{
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <Typography color='white' component="h1" variant="h5">
                    Register
                  </Typography>
                  <Box component="form" onSubmit={() => saveData()} sx={{ mt: 2 }}>
                    <TextField onChange={(e) => onChange()}
                      sx={{
                        backgroundColor: 'white', color: 'black'
                      }}
                      margin="normal"
                      required={true}
                      fullWidth
                      id="name"
                      label="username"
                      name="name"
                      type='text'
                      variant="filled"
                      autoFocus

                    />
                    <TextField onChange={(e) => onChange()}
                      sx={{
                        backgroundColor: 'white', color: 'black'
                      }}
                      margin="normal"
                      required={true}
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      type='email'
                      variant="filled"
                      autoFocus

                    />
                    <TextField onChange={(e) => onChange()}
                      sx={{
                        backgroundColor: 'white', color: 'black'
                      }}
                      margin="normal"
                      fullWidth
                      id="charger"
                      label="Charger Type"
                      name="charger"
                      type='text'
                      variant="filled"
                      autoFocus

                    />

                    <Button
                      style={{ backgroundColor: '#ffeb3b', color: 'black' }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                    <Link to={'/'} style={{ color: 'white', fontWeight: 'normal', fontSize: '1rem' }}>Skip For Now</Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </motion.div>
    </>
  )
}
