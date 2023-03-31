import React from "react";
import collage from '../assets/images/collage.jpg'
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, collection, doc } from 'firebase/firestore'

export const Game = () => {
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

  function getPageCoordinates(event) {
     return [event.clientX, event.clientY]
  }

  const SelectChar = () => {
    if (isCorrectGuess()) {
      // Fulfill win condition.
    } else {
      // Mark as incorrect.
    }
  }

  const popCharList = (xCoord, yCoord) => {
    /*
    Each name will have an event listener on it that will call isCorrectGuess
    with name of selected char and coords as args.
    */
  }

  const handleClick = async(e) => {
    const mouseCoords = getMousePos(e);
    const xCoord = mouseCoords[0];
    const yCoord = mouseCoords[1];
    console.log({xCoord, yCoord})
    console.log(await isCorrectGuess('misaka', xCoord, yCoord));
  }  
  
  return (
    <img src={collage} alt="Many anime characters." onClick={handleClick}></img>
  )
}