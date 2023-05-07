import React, { useState,useEffect } from "react";
import "./Popup.css";
function Popup() {
  const [groupName, setgroupName] = useState("");
  const [errors, seterrors] = useState([]);
  const [circle, setcircle] = useState("");
  const [groups, setgroups] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [activeDiv, setActiveDiv] = useState('');
  const colors = [
    {color:"#B38BFA",id:1},
    {color:"#FF79F2",id:2},
    {color:"#43E6FC",id:3},
    {color:"#F19576",id:4},
    {color:"#0047FF",id:5},
    {color:"#6691FF",id:6}
  ];
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
   setgroups(storedGroups);
  }, [])
  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  function handleChange(event) {
    setgroupName(event.target.value);
    console.log(groupName);
  }
  function getInitials(name) {
    console.log(name);
    let initials = "";
    const words = name.split(" ");
    console.log(words);
    console.log(words.length);
    if (words.length > 1) {
      for (let i = 0; i < 2; i++) {
        const word = words[i];
        initials += word[0];
      }
    } else {
      initials = words[0].slice(0, 2);
    }
    return initials.toUpperCase();
  }

  function handleClick(event) {
    event.preventDefault();
    const newErrors = [];
    if (groupName.length >= 5 && groupName.length < 16 && circle.length > 0) {
      const initial = getInitials(groupName);
      const groupData = {
        name: groupName,
        color:circle,
        initial: initial,
        id:groups.length+1,
        notes:[]
      };
      //This approach is known as using a functional update, 
      //which is a recommended way of updating state in React 
      //when the new state depends on the previous state. By using a functional update,
      // we can avoid issues like stale state or race conditions
      //(like the condition where when we add 1st element array is empty and upon adding
      //2nd element 1st element gets inserted).
      setgroups(groups => {
        const updatedGroups = [...groups, groupData];
        localStorage.setItem("groups", JSON.stringify(updatedGroups));
        return updatedGroups;
      });
      window.location.reload();
      togglePopup();
    } 
    ///////////////////!!!!!!!!!!
    else if (groupName.length < 5 && circle.length === 0) {
      newErrors.push("Input should atleast have 5 charecters");
      newErrors.push("Select atleast one colour");
    } else if (groupName.length < 5) {
      newErrors.push("Input should atleast have 5 charecters");
    } else if (groupName.length >= 16 && circle.length === 0) {
      newErrors.push("Input should not have more than 15 charecters");
      newErrors.push("Select atleast one colour");
    } else if (groupName.length >= 16) {
      newErrors.push("Input should not have more than 15 charecters");
    } else if (circle.length === 0) {
      newErrors.push("Select atleast one color");
    }

    seterrors(newErrors);
  }
function handleCircle(id)
{
  setActiveDiv(id)
}
  return (
    <div>
      {/* {closePopup ? ( */}
      <button onClick={togglePopup} className='createGroup'>+ Create Notes</button>
      {showPopup?
        <div className='popupContainer'>
          <div className="popupBox">
            <div className="headerPopup">
              <h1 className="popupHeader popupheader1">Create New Notes</h1>
            </div>
            {errors.map((error, index) => (
              <h1 className="popupError">{error}</h1>
            ))}
            <div className="groupNamePopup">
              <h1 className="popupHeader">Group Name</h1>
              <input
                onChange={handleChange}
                value={groupName}
                type="text"
                className="popupInput"
                placeholder="Enter your group name...."

              />
            </div>
            <div className="chooseColor">
              <h1 className="popupHeader">Choose Colour</h1>
              {colors.map((color,index) => (
                <div
                key={index}
                  style={{ backgroundColor: color.color }}
                  onClick={() => {setcircle(color.color);handleCircle(color.id);console.log(activeDiv)}}
                  className={activeDiv === color.id ? 'coloredBorder circlePopup' : 'circlePopup'}
                ></div>
              ))}
            </div>
            <button className="popupCreate" onClick={handleClick}>
              Create
            </button>
          </div>
        </div>:''}
    </div>
  );
}

export default Popup;
