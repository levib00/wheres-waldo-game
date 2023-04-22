import React from "react";
import hiei from '../assets/images/hiei.png'
import vash from '../assets/images/vash1.png'
import misaka from '../assets/images/misaka.png'

export const Modal = (props) => {
  const {startTimer, setShow} = props;

  const handleClick = () => {
    // Starts game
    startTimer()
    setShow(false)
  }

  return (
    <div className="modal">
      <div>
        <div className="modal-item">
          <div className="modal-image-container">
            <img className="modal-image" src={misaka} alt="Misaka example"/>
          </div>
          <p>Misaka from A Certain Scientific Railgun</p>
        </div>
        <div className="modal-item">
          <div className="modal-image-container">
            <img className="modal-image" src={vash} alt="Vash the Stampede example"/>
          </div>
          <p>Vash the Stampede from Trigun</p>
        </div>
        <div className="modal-item">
          <div className="modal-image-container">
            <img className="modal-image" src={hiei} alt="Hiei example"/>
          </div>
          <p>Hiei from Yu Yu Hakusho</p>
        </div>
      </div>
      <button onClick={handleClick} className="start-button">Start Game</button>
    </div>
  )
}