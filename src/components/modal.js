import React, { useState } from "react";
import hiei from '../assets/images/hiei.png'
import vash from '../assets/images/vash1.png'
import misaka from '../assets/images/misaka.png'

export const Modal = (props) => {
  const {startTimer, setShow} = props
  const myStyle = {
    position : 'absolute',
    width: '400px',
    height: '700px',
    top: 'calc(50% - 350px)',
    left: 'calc(50% - 200px)',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '5px 0px'
  }

  const imgStyle = {
    height: '200px',
    maxWidth: '130px'
  }

  const handleClick = () => {
    startTimer()
    setShow(false)
  }

  return (
    <div style={myStyle}>
      <div>
        <div style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
          <div style={{width: '130px', display: 'flex', justifyContent: 'center'}}>
            <img style={imgStyle} src={misaka} alt="Misaka example"/>
          </div>
          <p>Misaka from A Certain Scientific Railgun</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
          <div style={{width: '130px', display: 'flex', justifyContent: 'center'}}>
            <img style={imgStyle} src={vash} alt="Vash the Stampede example"/>
          </div>
          <p>Vash the Stampede from Trigun</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
          <div style={{width: '130px', display: 'flex', justifyContent: 'center'}}>
            <img style={imgStyle} src={hiei} alt="Hiei example"/>
          </div>
          <p>Hiei from Yu Yu Hakusho</p>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
    </div>
  )
}