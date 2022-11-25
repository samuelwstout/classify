import { useState, useEffect } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {

  const [composers, setComposers] = useState([])

  useEffect(() => {
    axios.get('https://api.openopus.org/composer/list/rec.json')
    .then((r) => setComposers(r.data.composers.map(c => c)))
  }, [])

  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login code={code} />} />
          <Route path='/search' element={<Search composers={composers} />} />
          <Route path='/results' element={<Results code={code} />} />
        </Routes>
    </Router>
  )
}

export default App
