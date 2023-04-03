import React, { useState } from "react";

export const CharacterDropdown = (props) => {
  const {top, left, isCorrectGuess} = props

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
    if (await isCorrectGuess(character, left, top)) {
      console.log(character, true)
    } else {
      console.log(character, false)
    }
  }
  return (
    <div>
      <div style={myStyle}>

      </div>
      <div style={myStyle2}>
        <p onClick={() => selectChar('hiei')}>Hiei</p>
        <p onClick={() => selectChar('vash')}>Vash The Stampede</p>
        <p onClick={() => selectChar('misaka')}>Misaka</p>
      </div>
    </div>
  )
}