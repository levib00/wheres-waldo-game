import React from "react";

export const CharacterDropdown = (props) => {
  const {top, left, isGuessCorrect, setShowDropdown, characters, handleCorrectGuess, getCharCoords, setIsMounted, setIsCorrect} = props
  
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
    const charCoords = await getCharCoords(character) // Get coordinates for chosen character from database
    const isCorrect = await isGuessCorrect(left, top, charCoords) // TODO: want to change this so i only call the database once on load, then just use an object in place of calling this every time. should speed up guessing significantly
    setIsCorrect(isCorrect)
    if (isCorrect) { // Check to see if user clicked within those acceptable coordinates
      const index = characters.findIndex(char => char.toLowerCase() === character)
      const charactersCopy = [...characters]
      charactersCopy.splice(index, 1) // Remove correct character from the dropdown
      handleCorrectGuess(character, charactersCopy)
    }
    setIsMounted(true)
    setTimeout(() => setIsMounted(false), 1000)
    setShowDropdown(false) // Unmount dropdown
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