import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Player from './Player'
import useToggle from './useToggle'
import { Box, Typography, Card, CardContent, CssBaseline } from '@mui/material'

const Tracks = ({ spotifyApi, accessToken, albumImg }) => {

    const params = useParams().id

    const [tracks, setTracks] = useState([])
    const [value, toggleValue] = useToggle(false)
    const [trackUri, setTrackUri] = useState('')

    useEffect(() => {
        if (!params) return setTracks([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.getAlbumTracks(params).then(res => {
          if (cancel) return
            const tracks = res.body.items.map(t => {
                return (
                      <Card variant='outlined' key={t.id} onClick={() => setTrackUri(t.uri)}>
                        <CardContent onClick={toggleValue}>
                            <Typography sx={{ cursor: 'pointer' }}>{t.name}</Typography>
                        </CardContent>
                      </Card>
                )
            })
            setTracks(tracks)
        }) 
      }, [params, accessToken, value])

  return (
    <>
    <CssBaseline />
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      >
        <Typography align='center'>
          <img src={albumImg} />
        </Typography>

          {tracks}

        <Box component="footer" sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <Player accessToken={accessToken} trackUri={value ? trackUri : null} />
        </Box>
      </Box>
    </>
  )
}

export default Tracks