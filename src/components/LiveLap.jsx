import "./Laps.css";
import { useState, useEffect } from "react";

function LiveLap({ totalElapsedTime, sumOfAllLapTimes, formatTime, laps }) {
  return (
    <li className="row-container" key="live-lap">
      <p>Lap {laps.length + 1}</p>
      <p>{formatTime(totalElapsedTime - sumOfAllLapTimes)}</p>
    </li>
  );
}

export default LiveLap;
