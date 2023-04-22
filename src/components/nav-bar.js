import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="nav">
      <div>
        <Link to='/wheres-waldo-game'><button className="hero">Can You Find</button></Link>
      </div>
      <div className="nav-button-container">
        <Link to='/wheres-waldo-game'><button className="nav-button">Play</button></Link>
        <Link to='/wheres-waldo-game/leaderboards'><button className="nav-button">Top 10</button></Link>
      </div>
    </div>
  )
}