import "./Time.css";
import { useState } from "react";

function Time({ totalElapsedTime, formatTime }) {
  // useEffect(,[totalElapsedTime]);

  return (
    <section className="time-container">
      <p className="time-text">{formatTime(totalElapsedTime)}</p>
    </section>
  );
}

export default Time;
