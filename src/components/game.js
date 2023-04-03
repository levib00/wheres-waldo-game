import React, { useState } from "react";
import collage from '../assets/images/collage.jpg'
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { CharacterDropdown } from "./character-dropdown";
import { Modal } from "./modal";
import Stopwatch from "./stopwatch";

export const Game = () => {
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [dropdown, setDropdown] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [show, setShow] = useState(true)

  const firebaseConfig = {
    apiKey: "AIzaSyDs7oKzMuuURyHgIv6rl_u6C_eJT6nfWQc",
    authDomain: "can-you-find-10bf9.firebaseapp.com",
    projectId: "can-you-find-10bf9",
    storageBucket: "can-you-find-10bf9.appspot.com",
    messagingSenderId: "438049237266",
    appId: "1:438049237266:web:affeb0d44a666ef86aabcb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  const isCorrectGuess = async(whichCharacter, xCoords, yCoords) => {
    const characterCollection = doc(db, 'coordinates', whichCharacter);
    const characterSnapshot = await getDoc(characterCollection);
    const coordObj = characterSnapshot.data();
    const dbCoordx1 = coordObj['x-coord-1']
    const dbCoordx2 = coordObj['x-coord-2']
    const dbCoordy1 = coordObj['y-coord-1']
    const dbCoordy2 = coordObj['y-coord-2']

    if ((dbCoordx1 < xCoords && xCoords < dbCoordx2) && (dbCoordy1 < yCoords && yCoords < dbCoordy2)) {
      return true
    } else {
      return false
    }
  }

  const getMousePos = (e) => {
    // e = Mouse click event.
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.
    return [ x, y ]
  }

  const popCharList = (dropdownX, dropdownY) => {
    /*
    Each name will have an event listener on it that will call isCorrectGuess
    with name of selected char and coords as args.
    */
   setDropdown(<CharacterDropdown top={dropdownY} left={dropdownX} isCorrectGuess={isCorrectGuess} />)
  }

  const handleClick = async(e) => {
    const mouseCoords = getMousePos(e);
    const xCoord = mouseCoords[0];
    const yCoord = mouseCoords[1];
    popCharList(xCoord, yCoord)
    setShowDropdown(!showDropdown)
  }  

  const startAndStop = () => {
    setTimerIsRunning(!timerIsRunning);
  };

  const myStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  }
  
  return (
    <div style={myStyle}>
      {show ? <Modal startTimer={startAndStop} setShow={setShow}/> : null}
      <Stopwatch timerIsRunning={timerIsRunning} />
      <img style={{width: '79vw'}} src={collage} alt="Many anime characters." onClick={handleClick} />
      {showDropdown ? dropdown : null}
    </div>
  )
}