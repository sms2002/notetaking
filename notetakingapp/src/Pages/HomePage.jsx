import React from 'react'
import Group from "../Components/Group/Group";
// import Note from "../Components/Note/Note";
import Popup from '../Components/Popup/Popup';
import '../styles.css'

function HomePage() {
  
  return (
    <>
   
    <div className='homepage'>
      <Group/>
    </div>
    <Popup/>
    </>
  )
}

export default HomePage
