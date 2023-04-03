import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const myStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 10px'
  }
  return (
    <div style={myStyle}>
      <div>
        Can You find
      </div>
      <div>
        <Link to='/'><button>Play</button></Link>
        <Link to='/leaderboards'><button>Leaderboards</button></Link>
      </div>
    </div>
  )
}