import { useState, useEffect } from 'react'

const Results = ({ accessToken, spotifyApi }) => {

  const [artistId, setArtistId] = useState('')

  const composer = localStorage.composer

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