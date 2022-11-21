import { useState, useEffect } from 'react'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {

  const [composers, setComposers] = useState([])

  useEffect(() => {
    const fetchComposers = async () => {
      const response = await fetch('composers.json')
      const data = await response.json()
      const listofComposers = data.composers.map((composer) => composer)
      setComposers(listofComposers)
    }
    fetchComposers()
  }, [])

  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login code={code} />} />
          <Route path='/search' element={<Search composerData={composers} />} />
          <Route path='/results' element={<Results code={code} />} />
        </Routes>
    </Router>
  )
}

export default App
