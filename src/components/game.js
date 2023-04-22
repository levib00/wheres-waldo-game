import React, { useEffect, useState } from "react";
import collage from '../assets/images/collage.jpg'
import { getDocs, doc, setDoc, collection } from 'firebase/firestore'
import { CharacterDropdown } from "./character-dropdown";
import { Modal } from "./modal";
import { Checklist } from './checklist'
import { SubmissionModal } from "./submission-modal";
import { Message } from "./message";
import Stopwatch from "./stopwatch";

export const Game = (props) => {
  const {getLeaderboards, db} = props

  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [dropdown, setDropdown] = useState([0, 0]) // Coordinates for where the dropdown is placed.
  const [showDropdown, setShowDropdown] = useState(false) // Controls whether dropdown shows.
  const [show, setShow] = useState(true) // Controls whether start game modal shows.
  const [checks, setChecks] = useState({
    misakaCheck: false,
    vashCheck: false,
    hieiCheck: false,
  }) // Controls whether checklist items are greyed out or not.
  const [characters, setCharacters] = useState(['Misaka', 'Vash', 'Hiei']) // Which characters are in dropdown.
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false) // Controls whether the end game modal shows.
  const [isCorrect, setIsCorrect] = useState(null) // Passed to message to tell it which message to display
  const [isMounted, setIsMounted] = useState(false) // Controls whether message shows
  const [charCoords, setCharCoords] = useState() // Holds coordinates of characters once they are pulled from the database.

  

  useEffect(() => {
    const getCharCoords = async() => { 
      // Gets coordinates for character chosen from dropdown.
      const characterCollection = collection(db, 'coordinates');
      const characterSnapshot = await getDocs(characterCollection);
      const coordObj = {}
      characterSnapshot.docs.forEach( doc => {
        coordObj[doc.id] = doc.data()
      })
      return coordObj
    }

    const characterSetter = async() => {
      try {
        setCharCoords(await getCharCoords())
      } catch(error) {
        console.error(error)
      }
    }
    characterSetter()
  }, [db])

  const isGuessCorrect = async(xCoords, yCoords, coordObj) => {
    // Checks whether the coordinates of the user click is within acceptable area for the chosen character.
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
    // Gets mouse coordinates then passes the coordinates to place the dropdown.
    if (!show && !gameOver) {
      const mouseCoords = getMousePos(e);
      const xCoord = mouseCoords[0];
      const yCoord = mouseCoords[1];
      setDropdown([yCoord, xCoord])
      setShowDropdown(!showDropdown)
    }
  }  

  const startAndStop = () => {
    // starts and stops the stopwatch
    setTimerIsRunning(!timerIsRunning);
  };

  const handleCorrectGuess = (character, charactersCopy) => {
    if (charactersCopy.length === 0) {
      // If there are no more characters in the list handle end game
      handleEndGame()
    } 
    setChecks(prevState => ({
      ...prevState,
      [`${character.toLowerCase()}Check`]: true
    })) // add grey out to the character in the checklist.
    setCharacters(charactersCopy)
  }

  const handleEndGame = async() => {
    startAndStop(); // Stop the timer.
    const isHighscore = await checkIsHighscore(time)
    setGameOver(<SubmissionModal time={time} submitTime={addToLeaderboards} isHighscore={isHighscore} />) // Show the game over modal.
  }

  const checkIsHighscore = async(newTime) => {
    // Check to see if the time is a top 10 time.
    const leaderboards = await getLeaderboards();
    for (let i = 0; i < leaderboards.length; i++) {
      if (!leaderboards[i] || newTime < leaderboards[i]['time']) {
        return true
      }
    }
    return false
  }

  const addToLeaderboards = async(newTime, name) => {
    // Add new times to the leaderboards
    const leaderboards = await getLeaderboards();
    leaderboards.push({name: name, time: newTime})
    leaderboards.sort(function (a, b) { // Sorts times for leaderboards
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
      <Message isCorrect={isCorrect} isMounted={isMounted} />
      {show ? <Modal startTimer={startAndStop} setShow={setShow}/> : <Checklist checks={checks}/>}
      <Stopwatch timerIsRunning={timerIsRunning} time={time} setTime={setTime}/>
      <img className="game-image" src={collage} alt="Many anime characters." onClick={handleClick} />
      {showDropdown ? <CharacterDropdown characters={characters} handleCorrectGuess={handleCorrectGuess} top={dropdown[0]} left={dropdown[1]} isGuessCorrect={isGuessCorrect} setShowDropdown={setShowDropdown} setIsMounted={setIsMounted} setIsCorrect={setIsCorrect} charCoords={charCoords}/> : null}
    </div>
  )
}