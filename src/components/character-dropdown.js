import React from "react";

export const CharacterDropdown = (props) => {
  const {top, left, isGuessCorrect, setShowDropdown, characters, handleCorrectGuess, setIsMounted, setIsCorrect, charCoords} = props
  
  const myStyle = {
    top: top - 75,
    left: left -75,
  }

  const myStyle2 = {
    top: top - 75,
    left: left + 91,
  }

  const selectChar = async(character) => {
    const parameters = await charCoords[character] // Get coordinates for chosen character from database
    const isCorrect = await isGuessCorrect(left, top, parameters)
    setIsCorrect(isCorrect)
    if (isCorrect) { // Check to see if user clicked within those acceptable coordinates
      const index = characters.findIndex(char => char.toLowerCase() === character)
      const charactersCopy = [...characters]
      charactersCopy.splice(index, 1) // Remove correct character from the dropdown
      handleCorrectGuess(character, charactersCopy)
    }
    setIsMounted(true) //Mounts then unmounts message.
    setTimeout(() => setIsMounted(false), 1000)
    setShowDropdown(false) // Unmount dropdown
  }

  return (
    <div>
      <div className="target-box drop-down" style={myStyle}>
      </div>
      <div className="drop-down drop-down-list" style={myStyle2}>
        <div className="character-container">
          {characters.map(character => <p className="character-name" key={character} onClick={() => selectChar(character.toLowerCase())}>{character}</p>)}
        </div>
      </div>
    </div>
  )
}