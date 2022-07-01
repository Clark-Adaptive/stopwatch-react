import "./Time.css";
import { useState } from "react";

function Time({ totalElapsedTime }) {
  // useEffect(,[totalElapsedTime]);

  function formatTime(milliseconds) {
    let centi;
    centi = Math.floor(milliseconds / 10);
    let min = Math.floor(centi / 6000);
    centi -= min * 6000;
    let sec = Math.floor(centi / 100);
    centi -= sec * 100;

    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}.${centi.toString().padStart(2, "0")}`;
  }

  return (
    <section className="time-container">
      <p className="time-text">{formatTime(totalElapsedTime)}</p>
    </section>
  );
}

export default Time;
