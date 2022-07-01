import { useState, useEffect } from "react";
import "./App.css";

import Time from "./Time";
import Buttons from "./Buttons";
import Laps from "./Laps";

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [laps, updateLaps] = useState([]);

  useEffect(startStopStopwatch, [isTimerRunning]);

  function startStopStopwatch() {
    if (isTimerRunning) {
      // start the stopwatch
      let startTime = Date.now();
      const intervalID = setInterval(() => {
        setTotalElapsedTime(Date.now() - startTime + totalElapsedTime);
      }, 1000 / 60);
      return () => {
        // console.log("clearing interval");
        clearInterval(intervalID);
      };
    } else {
      // stop the stopwatch, at the moment, it seems I don't actually need to do anything
    }
  }

  return (
    <main className="content-container">
      <Time totalElapsedTime={totalElapsedTime} />
      <Buttons
        setTotalElapsedTime={setTotalElapsedTime}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        updateLaps={updateLaps}
      />
      <Laps laps={laps} totalElapsedTime={totalElapsedTime} />
    </main>
  );
}

export default App;
