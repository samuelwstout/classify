import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'

const spotifyApi = new SpotifyWebApi({
  clientId: 'a45eb12484d24c4199050bdefee6d24b',
})

const Results = ({ code }) => {

  const [artistId, setArtistId] = useState('')

  const accessToken = useAuth(code)
  const composer = localStorage.composer

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!composer) return setArtistId([])
    if (!accessToken) return
    let cancel = false
    spotifyApi.searchArtists(composer).then(res => {
      if (cancel) return
      setArtistId(res.body.artists.items[0].id)
    })
  }, [composer, accessToken])

  return (
    <>
      <h1>{composer}</h1>
      <h3>{artistId}</h3>
    </>
  )
}

export default Results