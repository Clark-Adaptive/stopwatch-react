import "./Laps.css";
import { useState, useEffect } from "react";

function Laps({ laps }) {
  const [slowLapIndex, setSlowLapIndex] = useState(0);
  const [slowLapTime, setSlowLapTime] = useState(Number.NEGATIVE_INFINITY);
  const [fastLapIndex, setFastLapIndex] = useState(0);
  const [fastLapTime, setFastLapTime] = useState(Number.POSITIVE_INFINITY);

  return laps
    .map((lap) => (
      <li className="row-container" key={lap.number}>
        <p>Lap {lap.number}</p>
        <p>{lap.time}</p>
      </li>
    ))
    .reverse();
}

export default Laps;
