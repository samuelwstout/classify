import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Tracks = ({ spotifyApi, accessToken, albumImg }) => {

    const params = useParams().id

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        if (!params) return setTracks([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.getAlbumTracks(params).then(res => {
          if (cancel) return
            const tracks = res.body.items.map(t => {
                return (
                    <div key={t.id}>
                        <h5>{t.name}</h5>
                    </div>
                )
            })
            setTracks(tracks)
        }) 
      }, [params, accessToken])

  return (
    <>
        <img src={albumImg}></img>
        {tracks}
    </>
  )
}

export default Tracks