import "./Time.css";
import { useState } from "react";

function Time({ state, formatTime }) {
  // useEffect(,[totalElapsedTime]);

  return (
    <section className="time-container">
      <p className="time-text">{formatTime(state.totalElapsedTime)}</p>
    </section>
  );
}

export default Time;
