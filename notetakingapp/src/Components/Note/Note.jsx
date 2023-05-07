import React, { useState, useEffect } from "react";

import Send from "../../assets/send.png";
import "./Note.css";
import Left from "../../assets/left.png"
import { useNavigate } from "react-router-dom";
function Note(props) {
  const [message, setmessage] = useState("");
  const [array, setArray] = useState([]);
  const backgroundColor = { backgroundColor: props.color };
  const navigate=useNavigate()
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("groups"));
    if (storedArray) {
      const filteredArray = storedArray.filter((item) => item.id === props.id);
      if (filteredArray.length > 0) {
        setArray(filteredArray[0].notes);
      }
    }
  }, [props]);

  function handleClick() {
    const storedArray = JSON.parse(localStorage.getItem("groups"));
    if (storedArray) {
      const filteredArray = storedArray.filter((item) => item.id === props.id);
      if (filteredArray[0].notes) {
        if(message.trim().length>0)
        {
        filteredArray[0].notes.push({
          message: message,
          timestamp: new Date().toLocaleTimeString(),
          datestamp: new Date().toLocaleDateString(),
        });
        setArray(filteredArray[0].notes);
      }
        console.log(array);
      }
      localStorage.setItem("groups", JSON.stringify(storedArray));
    }
    setmessage("");
  }

  function handleClick1(event) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  function handleChange(event) {
    setmessage(event.target.value);
    console.log(message);
  }
  function handleRoute()
  {
    navigate('/')
  }

  return (
    <div className="containerNote">
      <div className="topSection">
        <img src={Left} alt="" className="mobile-only" onClick={handleRoute}/>
        <div style={backgroundColor} className="circle circle1">
          {props.initial}
        </div>
        <div className="header1">{props.name}</div>
      </div>
      <div className="middleSection">
        <div className="msgContainer">
          {array.map((item) => {
            return (
              <div className="innerContainer">
                <div className="msgLeftContainer">
                  <div className="currentDate">{item.timestamp}</div>
                  <div className="currentTime">{item.datestamp}</div>
                </div>
                <div className="msgRightContainer">
                  <p className="notePara">{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottomSection">
        <textarea
          onKeyDown={handleClick1}
          onChange={handleChange}
          value={message}
          className="textArea"
          name=""
          placeholder="Enter your text here..........."
        ></textarea>
        <img
          src={Send}
          onClick={handleClick}
          alt="msglogo"
          className="msgLogo"
        />
      </div>
    </div>
  );
}

export default Note;
