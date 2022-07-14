import "./Laps.css";
import { useState, useEffect } from "react";

function Laps({ laps }) {
  const [slowLapIndex, setSlowLapIndex] = useState(0);
  const [slowLapTime, setSlowLapTime] = useState(Number.NEGATIVE_INFINITY);
  const [fastLapIndex, setFastLapIndex] = useState(0);
  const [fastLapTime, setFastLapTime] = useState(Number.POSITIVE_INFINITY);

  function checkFastSlowLaps() {
    const mostRecentLap = { ...laps[laps.length - 1] };
    if (mostRecentLap.time > slowLapTime) {
      setSlowLapTime(mostRecentLap.time);
      setSlowLapIndex(mostRecentLap.number);
    }
    if (mostRecentLap.time < fastLapTime) {
      setFastLapTime(mostRecentLap.time);
      setFastLapIndex(mostRecentLap.number);
    }
  }

  useEffect(checkFastSlowLaps, [laps]);

  return laps
    .map((lap) => (
      <li
        className={
          "row-container " +
          (laps.length >= 2 && lap.number == slowLapIndex ? "slow-lap" : "") +
          (laps.length >= 2 && lap.number == fastLapIndex ? "fast-lap" : "")
        }
        key={lap.number}
      >
        <p>Lap {lap.number}</p>
        <p>{lap.formattedTime}</p>
      </li>
    ))
    .reverse();
}

export default Laps;
