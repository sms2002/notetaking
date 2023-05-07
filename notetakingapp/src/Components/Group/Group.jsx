import React,{useEffect, useState} from 'react'
import './Group.css'
import Note from '../Note/Note'
import {useNavigate} from 'react-router-dom'
function Group() {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [initial, setInitial] = useState('')
    const [groups, setGroups] = useState([])
    const [id, setId] = useState(0)
    const [activeDiv, setActiveDiv] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 426); 
    const navigate=useNavigate()
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 426);
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    function handleClick(item,color,initial,id)
      {
        setName(item)
        setColor(color) 
        setInitial(initial) 
        setId(id)
        setActiveDiv(id);
        if(isMobile)
        {
        navigate('/temp',{state:{id:id,name:item,color:color,initial:initial}})
        }
      }
      useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem("groups"))||[];
        if (storedGroups) {
          setGroups(storedGroups);
        }
      }, []);

      
  return (
    <div className='flexibleDivs'>
    <div className="containerGroup">
        <h1 className='groupHeader'>Pocket Notes</h1>
        {/* <button onClick={togglePopup} className='createGroup'>+ Create Notes</button> */}
        <div className="groupList">
            <div className="underList">
                {/* max 18 charecters possible so set 15 on pop up */}
                {groups.map((item)=>{
                    const backgroundColor = { backgroundColor: item.color };
                    return(
                    <div onClick={()=>{handleClick(item.name,item.color,item.initial,item.id);}} className={activeDiv === item.id ? 'coloredDiv list' : 'list'}>
                    <div style={backgroundColor}className="circle">{item.initial}</div>
                    <div className="header">{item.name}</div>  
                </div>);
                })} 
            </div>
        </div>
    </div>
    {isMobile?'':
    <Note name={name} color={color} initial={initial} id={id}/>}
    </div>
  )
}

export default Group
