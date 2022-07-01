import "./Laps.css";
import { useState, useEffect } from "react";

function Laps({ laps, totalElapsedTime }) {
  const [slowLapIndex, setSlowLapIndex] = useState(0);
  const [slowLapTime, setSlowLapTime] = useState(Number.NEGATIVE_INFINITY);
  const [fastLapIndex, setFastLapIndex] = useState(0);
  const [fastLapTime, setFastLapTime] = useState(Number.POSITIVE_INFINITY);

  useEffect(() => {
    console.log("useEffect in Laps component");
    // TODO: edit the most previously added lap to actually have the lap number and lap time
  }, [laps]);

  return <ul className="lap-container"></ul>;
}

export default Laps;
