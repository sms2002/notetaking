import React from 'react'
import Note from '../Components/Note/Note'
import { useLocation } from 'react-router-dom'

function Temps() {
    const location=useLocation()
  return (
    <div>
      <Note name={location.state.name} color={location.state.color} initial={location.state.initial} id={location.state.id}/>
    </div>
  )
}

export default Temps
