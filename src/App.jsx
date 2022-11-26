import { useState, useEffect } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Albums from './components/Albums'
import Tracks from './components/Tracks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './components/useAuth'

const code = new URLSearchParams(window.location.search).get('code')

const spotifyApi = new SpotifyWebApi({
  clientId: 'a45eb12484d24c4199050bdefee6d24b',
})

const App = () => {

  const [composers, setComposers] = useState([])
  const [albumImg, setAlbumImg] = useState('')

  useEffect(() => {
    axios.get('https://api.openopus.org/composer/list/rec.json')
    .then((r) => setComposers(r.data.composers.map(c => c)))
  }, [])

  let accessToken;

  if (code) {
    accessToken = useAuth(code)
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])


  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login code={code} />} />
          <Route path='/search' element={<Search composers={composers} />} />
          <Route path='/albums' element={<Albums spotifyApi={spotifyApi} accessToken={accessToken} setAlbumImg={setAlbumImg} />} />
          <Route path='/tracks/:id' element={<Tracks spotifyApi={spotifyApi} accessToken={accessToken} albumImg={albumImg} />} />
        </Routes>
    </Router>
  )
}

export default App
