import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="nav">
      <div>
        <Link to='/'><button className="hero">Can You Find</button></Link>
      </div>
      <div className="nav-button-container">
        <Link to='/'><button className="nav-button">Play</button></Link>
        <Link to='/leaderboards'><button className="nav-button">Leaderboards</button></Link>
      </div>
    </div>
  )
}