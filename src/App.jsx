import { useState } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

let code = new URLSearchParams(window.location.search).get('code')

const App = () => {

  const [composers, setComposers] = useState([])

  axios.get('https://api.openopus.org/composer/list/rec.json')
    .then((r) => setComposers(r.data.composers.map(c => c)))

  if (code) {
    axios.post('http://localhost:3001/login', code)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('code', code)
    })
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: 'a45eb12484d24c4199050bdefee6d24b',
  })
  
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login code={code} />} />
          <Route path='/search' element={<Search composers={composers} />} />
          <Route path='/results' element={<Results spotifyApi={spotifyApi} />} />
        </Routes>
    </Router>
  )
}

export default App
