import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CssBaseline, Box, Typography, Container } from '@mui/material'

const AUTH_URL_LOCAL = 'https://accounts.spotify.com/authorize?client_id=a45eb12484d24c4199050bdefee6d24b&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const AUTH_URL_PROD = 'https://accounts.spotify.com/authorize?client_id=a45eb12484d24c4199050bdefee6d24b&response_type=code&redirect_uri=https://classify.up.railway.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const Login = ({ code }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (code) {
          navigate('/search')
        }
        }, [])
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
            <Typography component="h1" variant="h2">
            Classify
            </Typography>
            <Typography sx={{ mt: 2 }}>
                <Button href={AUTH_URL_LOCAL} variant='outlined'>LISTEN ON<img width={70} style={{ paddingLeft: '.60rem' }} src='../Spotify_Icon_CMYK_Green.png'></img></Button>
            </Typography> 
            </Box>
      </Container>
    )
}

export default Login