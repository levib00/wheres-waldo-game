import React, { useState } from "react";

export const CharacterDropdown = (props) => {
  const {top, left, isGuessCorrect, setShowDropdown, characters, handleCorrectGuess} = props

  const myStyle = {
    position: 'absolute',
    top: top - 75,
    left: left -75,
    border: 'red 5px solid',
    color: 'yellow',
    height: '150px',
    width: '150px'
  }

  const myStyle2 = {
    position: 'absolute',
    top: top + 45,
    left: left + 79,
    border: 'red 5px solid',
    color: 'yellow',
    height: '150px',
    width: '150px',
    backgroundColor: 'grey',
  }

  const selectChar = async(character) => {
    if (await isGuessCorrect(character, left, top)) {
      const index = characters.findIndex(char => char.toLowerCase() === character)
      const charactersCopy = [...characters]
      charactersCopy.splice(index, 1)
     handleCorrectGuess(character, charactersCopy) 
    }
    setShowDropdown(false)
  }
  return (
    <div>
      <div style={myStyle}>
      </div>
      <div style={myStyle2}>
        {characters.map(character => <p key={character} onClick={() => selectChar(character.toLowerCase())}>{character}</p>)}
      </div>
    </div>
  )
}