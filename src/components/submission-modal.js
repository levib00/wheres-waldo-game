import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SubmissionModal = (props) => {
  const [nameValue, setNameValue] = useState('')
  const [modalContents, setModalContents] = useState(false)

  const { time, isHighscore, submitTime } = props

  const changeContents = () => {
    setModalContents(
    <div className="modal" id="submission-modal">
      <Link to='/leaderboards'><button className="start-button">Go to leaderboards</button></Link>
    </div>
    )
  }

  const newHighScore = (isHighscore) => {
    // Display a modal that asks for a name if your time is a new high score.
    if (isHighscore) {
      return (
        <div className="modal" id="submission-modal">
          <p className="end-message">New High Score!</p>
          <h2 className="finished-time">
            {Math.floor(time / 6000).toString().padStart(2, "0")}:
            {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}:
            {(time % 100).toString().padStart(2, "0")}
          </h2>
          <label htmlFor="name-input">Please input your name here</label>
          <input id="name-input" onChange={(e) => {setNameValue(e.target.value); console.log(nameValue
            )}} value={nameValue}/>
          <button className="start-button" onClick={() => handleClick(time, nameValue)}>Submit Time</button>
        </div>
      )
    } else {
      // Display a message that doesn't ask for your name if you don't get a new high score.
      return (
        <div className="modal" id="submission-modal">
          <p className="end-message">Great try!</p>
          <h2 className="finished-time">
            {Math.floor(time / 6000).toString().padStart(2, "0")}:
            {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}:
            {(time % 100).toString().padStart(2, "0")}
          </h2>
          <Link to='/leaderboards'><button className="start-button">Go to leaderboards</button></Link>
        </div>
      )
    }
  }

  const handleClick = (time, name) => {
    // Submit time and change modal contents to a link to the leaderboards page.
    submitTime(time, name);
    changeContents();
  }

  return (
      <div>{modalContents ? modalContents : newHighScore(isHighscore)}</div>
  )
}