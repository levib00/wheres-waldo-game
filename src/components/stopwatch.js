import React, { useState, useEffect } from "react";
import '../styles/styles.css'

const Stopwatch = (props) => {
  // state to store time
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (props.timerIsRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [props.timerIsRunning, time]);

  // Minutes calculation
  const minutes = Math.floor(time / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default Stopwatch;