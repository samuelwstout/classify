import React from 'react'
import { selectName } from '../redux/composerSlice'
import { useSelector } from 'react-redux'

const Results = () => {

  const composer = useSelector(selectName)


  return (
    <> 
      <h1>{composer}</h1>
    </>
  )
}

export default Results