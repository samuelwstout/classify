import { useState, useEffect } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
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
          <Route path='/results' element={<Results spotifyApi={spotifyApi} accessToken={accessToken} />} />
        </Routes>
    </Router>
  )
}

export default App
