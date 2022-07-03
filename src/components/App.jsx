import { useState, useEffect } from "react";
import "./App.css";

import Time from "./Time";
import Buttons from "./Buttons";
import Laps from "./Laps";

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [laps, updateLaps] = useState([]);
  const [sumOfAllLapTimes, setSumOfAllLapTimes] = useState(0);

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

  function reset() {
    setTotalElapsedTime(0);
    updateLaps([]);
  }

  return (
    <main className="content-container">
      <Time totalElapsedTime={totalElapsedTime} />
      <Buttons
        totalElapsedTime={totalElapsedTime}
        setTotalElapsedTime={setTotalElapsedTime}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        laps={laps}
        updateLaps={updateLaps}
        sumOfAllLapTimes={sumOfAllLapTimes}
        setSumOfAllLapTimes={setSumOfAllLapTimes}
        reset={reset}
      />
      <Laps laps={laps} totalElapsedTime={totalElapsedTime} />
    </main>
  );
}

export default App;
