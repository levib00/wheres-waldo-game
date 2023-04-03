import React, { useState } from "react";

export const Modal = (props) => {
  const {startTimer, setShow} = props
  const myStyle = {
    position : 'absolute',
    width: '300px',
    height: '300px',
    top: 'calc(50% - 150px)',
    left: 'calc(50% - 150px)',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  const handleClick = () => {
    startTimer()
    setShow(false)
  }
  console.log(props)
  return (
    <div style={myStyle}>
      <div>
        <div>
          <img />
          <p>Hiei from Yu Yu Hakusho</p>
        </div>
        <div>
          <img />
          <p>Vash the Stampede from Trigun</p>
        </div>
        <div>
          <img />
          <p>Misaka from A Certain Scientific Railgun</p>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
    </div>
  )
}