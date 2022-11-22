import { useState, useEffect } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './components/useAuth'

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {

  const [composers, setComposers] = useState([])

  useEffect(() => {
    const fetchComposers = async () => {
      const response = await fetch('https://api.openopus.org/composer/list/rec.json')
      const data = await response.json()
      const listofComposers = data.composers.map((composer) => composer)
      setComposers(listofComposers)
    }
    fetchComposers()
  }, [])

  const spotifyApi = new SpotifyWebApi({
    clientId: 'a45eb12484d24c4199050bdefee6d24b',
  })

  let accessToken
  if (code) {
  accessToken = useAuth(code)
  }

  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login code={code} />} />
          <Route path='/search' element={<Search composers={composers} />} />
          <Route path='/results' element={<Results accessToken={accessToken} spotifyApi={spotifyApi} />} />
        </Routes>
    </Router>
  )
}

export default App
