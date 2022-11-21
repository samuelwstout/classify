import { useState, useEffect } from 'react'
import { selectName } from '../redux/composerSlice'
import { useSelector } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-node'

const Results = () => {

  const composer = useSelector(selectName)

  const spotifyApi = new SpotifyWebApi({
    clientId: 'a45eb12484d24c4199050bdefee6d24b',
  })

  const AUTH_URL_LOCAL = 'https://accounts.spotify.com/authorize?client_id=a45eb12484d24c4199050bdefee6d24b&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

  const AUTH_URL_PROD = 'https://accounts.spotify.com/authorize?client_id=a45eb12484d24c4199050bdefee6d24b&response_type=code&redirect_uri=https://classify.up.railway.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

  


  return (
    <> 
      <h1>{composer}</h1>
    </>
  )
}

export default Results