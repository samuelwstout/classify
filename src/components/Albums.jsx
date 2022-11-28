import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, ImageListItem, ImageListItemBar, ImageList, CssBaseline, Button } from '@mui/material'

const Albums = ({ accessToken, spotifyApi, setAlbumImg }) => {

  const navigate = useNavigate()

  const [artistId, setArtistId] = useState('')
  const [albums, setAlbums] = useState([])

  const composer = localStorage.composer

  useEffect(() => {
    if (!composer) return setArtistId([])
    if (!accessToken) return
    const cancel = false
    spotifyApi.searchArtists(composer).then(res => {
      if (cancel) return
      setArtistId(res.body.artists.items[0].id)
    })
  }, [composer, accessToken])

  useEffect(() => {
    if (!artistId) return setAlbums([])
    if (!accessToken) return
    const cancel = false
    spotifyApi.getArtistAlbums(artistId).then(res => {
      if (cancel) return
        const albums = res.body.items.map(a => {
            return (
              <ImageListItem key={a.id} onClick={() => {
                navigate(`/tracks/${a.id}`)
                setAlbumImg(a.images[1].url)
              }}>
                <img src={a.images[1].url} />
                <ImageListItemBar title={a.name} />
              </ImageListItem>
            )
          })
        setAlbums(albums)
      })
    }, [artistId, accessToken])

  return (
    <>
    <CssBaseline />
      <Typography align='left'>
        <Button onClick={() => navigate('/search')}>Back</Button>
      </Typography>
      <Box sx={{ pt: 2, pb: 3 }}>
          <Typography align='center' component='h1' variant='h4'>{composer}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
        <ImageList sx={{ width: 750, height: 750 }}>
          {albums}
        </ImageList>
        </Box>
      </Box>
    </>
  )
}

export default Albums