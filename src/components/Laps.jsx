import "./Laps.css";
import { useState, useEffect } from "react";

function Laps({ laps, updateLaps, totalElapsedTime }) {
  const [slowLapIndex, setSlowLapIndex] = useState(0);
  const [slowLapTime, setSlowLapTime] = useState(Number.NEGATIVE_INFINITY);
  const [fastLapIndex, setFastLapIndex] = useState(0);
  const [fastLapTime, setFastLapTime] = useState(Number.POSITIVE_INFINITY);

  return (
    <ul className="lap-container">
      {laps.map((lap) => (
        <li key={lap.number}>{lap.number + " " + lap.time}</li>
      ))}
    </ul>
  );
}

export default Laps;
