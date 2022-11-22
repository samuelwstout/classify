import { useState, useEffect } from 'react'
import { selectName } from '../redux/composerSlice'
import { useSelector } from 'react-redux'

const Results = ({ accessToken, spotifyApi }) => {

  const [artistId, setArtistId] = useState('')

  const composer = useSelector(selectName)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!composer) return setArtistId([])
    if (!accessToken) return
    const cancel = false
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