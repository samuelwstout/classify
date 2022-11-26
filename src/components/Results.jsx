import { useState, useEffect } from 'react'

const Results = ({ accessToken, spotifyApi }) => {

  const [artistId, setArtistId] = useState('')
  const [albums, setAlbums] = useState([])

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

  useEffect(() => {
    if (!artistId) return setAlbums([])
    if (!accessToken) return
    let cancel = false
    spotifyApi.getArtistAlbums(artistId).then(res => {
      if (cancel) return
      res.body.items.map(a => console.log(a))
        const albums = res.body.items.map(a => {
            return (
              <div key={a.id}>
                <h5>{a.name}</h5>
                <img src={a.images[1].url}></img>
              </div>
            )
          })
        setAlbums(albums)
      })
    }, [artistId, accessToken])

  return (
    <>
      <h1>{composer}</h1>
      {albums}
    </>
  )
}

export default Results