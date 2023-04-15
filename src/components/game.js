import React, { useState } from "react";
import collage from '../assets/images/collage.jpg'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { CharacterDropdown } from "./character-dropdown";
import { Modal } from "./modal";
import { Checklist } from './checklist'
import { SubmissionModal } from "./submission-modal";
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
  const [gameOver, setGameOver] = useState(false)

  const getCharCoords = async(whichCharacter) => {
    const characterCollection = doc(db, 'coordinates', whichCharacter);
    const characterSnapshot = await getDoc(characterCollection);
    characterSnapshot.data();
    return characterSnapshot.data();
  }

  const isGuessCorrect = async(xCoords, yCoords, coordObj) => {
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

  const handleEndGame = async() => {
    startAndStop();
    setGameOver(true)
    const isHighscore = await checkIsHighscore(time)
    setGameOver(<SubmissionModal time={time} submitTime={addToLeaderboards} isHighscore={isHighscore} />)
  }

  const checkIsHighscore = async(newTime) => {
    const leaderboards = await getLeaderboards();
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
      {gameOver ? gameOver : null}
      {show ? <Modal startTimer={startAndStop} setShow={setShow}/> : <Checklist checks={checks}/>}
      <Stopwatch timerIsRunning={timerIsRunning} time={time} setTime={setTime}/>
      <img className="game-image" src={collage} alt="Many anime characters." onClick={handleClick} />
      {showDropdown ? <CharacterDropdown characters={characters} getCharCoords={getCharCoords} handleCorrectGuess={handleCorrectGuess} top={dropdown[0]} left={dropdown[1]} isGuessCorrect={isGuessCorrect} setShowDropdown={setShowDropdown} setDropdown={setDropdown} /> : null}
    </div>
  )
}