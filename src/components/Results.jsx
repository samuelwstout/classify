import { useState, useEffect } from 'react'

const Results = ({ spotifyApi }) => {

  const accessToken = localStorage.accessToken
  const composer = localStorage.composer

  const [artistId, setArtistId] = useState('')

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    spotifyApi.searchArtists(composer).then(res => {
      setArtistId(res.body.artists.items[0].id)
    })
  }, [composer])

  return (
    <>
      <h1>{composer}</h1>
      <h3>{artistId}</h3>
    </>
  )
}

export default Results