import React, { useState } from "react";
import collage from '../assets/images/collage.jpg'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { CharacterDropdown } from "./character-dropdown";
import { Modal } from "./modal";
import { Checklist } from './checklist'
import Stopwatch from "./stopwatch";

export const Game = (props) => {
  const {getLeaderboards, db} = props

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
    if (charactersCopy.length === 0) {
      handleEndGame()
    }
    setChecks(prevState => ({
      ...prevState,
      [`${character.toLowerCase()}Check`]: true
    }))
    setCharacters(charactersCopy)
  }

  const handleEndGame = () => {
    startAndStop();
    const isHighscore = checkIsHighscore(time)
    console.log(!!isHighscore)
    if(isHighscore !== false) {
      popRequestName(time, isHighscore)
    }
  }

  const popRequestName = async(newTime, placement) => {
    const name = prompt('what is your name')
    console.log(name, newTime)
    addToLeaderboards(newTime, name)
  }

  const checkIsHighscore = async(newTime) => {
    const leaderboards = await getLeaderboards();
    console.log(leaderboards)
    for (let i = 0; i < leaderboards.length; i++) {
      if (!leaderboards[i] || newTime < leaderboards[i]['time']) {
        return true
      }
    }
    return false
  }

  const addToLeaderboards = async(newTime, name) => {
    const leaderboards = await getLeaderboards();
    leaderboards.push({name: name, time: newTime})
    console.log(leaderboards)
    leaderboards.sort(function (a, b) {
      return a.time - b.time;
    });
    for (let i = 0; i < leaderboards.length && i < 10; i++) {
      await setDoc(doc(db, 'leaderboards', i.toString()), {
        name: leaderboards[i].name,
        time: leaderboards[i].time
      });
    }
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