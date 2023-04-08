import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const myStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 50px',
    fontSize: '1.6rem',
    height: '40px',
  }
  return (
    <div style={myStyle} className="nav">
      <div>
        Can You Find
      </div>
      <div>
        <Link to='/'><button>Play</button></Link>
        <Link to='/leaderboards'><button>Leaderboards</button></Link>
      </div>
    </div>
  )
}