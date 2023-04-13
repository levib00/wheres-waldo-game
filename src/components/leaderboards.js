import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid'

export const LeaderBoards = (props) => {
  const { getLeaderboards } = props
  const [leaderboards, setLeaderboards] = useState([])

  useEffect(() => {
    getLeaderboards().then((leaderboards) => setLeaderboards(leaderboards));
  }, [getLeaderboards]);

  if (!leaderboards) return <div>Loading...</div>;

  let i = 1

  return (
    <div className="top-grid">
      <h1 className="leaderboard-header">
        Top 10
      </h1>
      <div className="grid-slot">
        <div className="grid-item">Placement</div>
        <div className="grid-item">Name</div>
        <div className="grid-item">Time</div>
      </div>
      {leaderboards.map(slot => <div key={uuidv4()} className="grid-slot">
        <div className="grid-item">
          {i++}
        </div>
        <div className="grid-item">
          {slot.name}
        </div>
        <div className="grid-item">
        {Math.floor(slot.time / 6000).toString().padStart(2, "0")}:
        {Math.floor((slot.time % 6000) / 100).toString().padStart(2, "0")}:
        {(slot.time % 100).toString().padStart(2, "0")}
        </div>
      </div>)}
    </div>
  )
}