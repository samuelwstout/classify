import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Player from './Player'
import useToggle from './useToggle'

const Tracks = ({ spotifyApi, accessToken, albumImg }) => {

    const params = useParams().id

    const [tracks, setTracks] = useState([])
    const [value, toggleValue] = useToggle(false)
    const [playingTrack, setPlayingTrack] = useState([])

    useEffect(() => {
        if (!params) return setTracks([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.getAlbumTracks(params).then(res => {
          if (cancel) return
            const tracks = res.body.items.map(t => {
                return (
                      <div key={t.id} onClick={() => setPlayingTrack(t)}>
                        <div onClick={toggleValue}>
                            <h5>{t.name}</h5>
                        </div>
                      </div>
                )
            })
            setTracks(tracks)
        }) 
      }, [params, accessToken, value])

  return (
    <>
        <img src={albumImg}></img>
        {tracks}
        <Player accessToken={accessToken} trackUri={value ? playingTrack.uri : null} />
    </>
  )
}

export default Tracks