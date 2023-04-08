import React, { useState } from "react";
import collage from '../assets/images/collage.jpg'
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import { CharacterDropdown } from "./character-dropdown";
import { Modal } from "./modal";
import { Checklist } from './checklist'
import Stopwatch from "./stopwatch";
import { v4 as uuidv4 } from 'uuid';

export const Game = () => {
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [dropdown, setDropdown] = useState([0, 0])
  const [showDropdown, setShowDropdown] = useState(false)
  const [show, setShow] = useState(true)
  const [checks, setChecks] = useState({
    misakaCheck: false,
    vashCheck: false,
    hieiCheck: false,
  })
  const [characters, setCharacters] = useState(['Misaka', 'Vash', 'Hiei'])
  const [time, setTime] = useState(0);

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
  const db = getFirestore(app);

  const isGuessCorrect = async(whichCharacter, xCoords, yCoords) => {
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
    let x = e.clientX; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.
    return [ x, y ]
  }

  const handleClick = async(e) => {
    if (!show) {
      const mouseCoords = getMousePos(e);
      const xCoord = mouseCoords[0];
      const yCoord = mouseCoords[1];
      setDropdown([yCoord, xCoord])
      setShowDropdown(!showDropdown)
    }
  }  

  const startAndStop = () => {
    setTimerIsRunning(!timerIsRunning);
  };

  const handleCorrectGuess = (character, charactersCopy) => {
    setChecks(prevState => ({
      ...prevState,
      [`${character.toLowerCase()}Check`]: true
    }))
    setCharacters(charactersCopy)   
    setTimeout(() => console.log(charactersCopy), 1000) 
    if (charactersCopy.length === 0) {
      handleEndGame()
    }
  }

  const handleEndGame = () => {
    startAndStop();
    const isHighscore = checkIsHighscore(time)
    console.log(isHighscore)
    if(isHighscore !== false) {
      popRequestName(time, isHighscore)
    }
    
  }

  const getLeaderboards = async() => {
    const leaderboardCol = collection(db, `leaderboards`);
        const leaderboardSnapshot = await getDocs(leaderboardCol);
        const leaderboards = leaderboardSnapshot.docs.map(doc => doc.data());
        return leaderboards
  }

  const popRequestName = (newTime, placement) => {
    const name = prompt('what is your name')
    console.log(name, newTime, placement)
    addToLeaderboards( placement.toString(), newTime, name)
  }
  const checkIsHighscore = (newTime) => {
    const leaderboards = getLeaderboards();
    for (let i = 0; i < 9; i++) {
      if (newTime < leaderboards[i] || !leaderboards[i]) {
        return i + 1
      }
    }
    return false
  }

  const addToLeaderboards = async(placement, newTime, name) => {
    await setDoc(doc(db, 'leaderboards', placement), {
      name: name,
      time: newTime
    });
  }

  const myStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  }
  
  return (
    <div className="game-container" style={myStyle}>
      {show ? <Modal startTimer={startAndStop} setShow={setShow}/> : <Checklist checks={checks}/>}
      <Stopwatch timerIsRunning={timerIsRunning} time={time} setTime={setTime}/>
      <img style={{width: '78.9vw'}} src={collage} alt="Many anime characters." onClick={handleClick} />
      {showDropdown ? <CharacterDropdown characters={characters} handleCorrectGuess={handleCorrectGuess} top={dropdown[0]} left={dropdown[1]} isGuessCorrect={isGuessCorrect} setShowDropdown={setShowDropdown} setDropdown={setDropdown} /> : null}
    </div>
  )
}