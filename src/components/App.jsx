import { useState, useEffect } from "react";
import "./App.css";

import Time from "./Time";
import Buttons from "./Buttons";
import LiveLap from "./LiveLap";
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

  function reset() {
    setTotalElapsedTime(0);
    setSumOfAllLapTimes(0);
    updateLaps([]);
  }

  return (
    <main className="content-container">
      <Time totalElapsedTime={totalElapsedTime} formatTime={formatTime} />
      <Buttons
        totalElapsedTime={totalElapsedTime}
        formatTime={formatTime}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        laps={laps}
        updateLaps={updateLaps}
        sumOfAllLapTimes={sumOfAllLapTimes}
        setSumOfAllLapTimes={setSumOfAllLapTimes}
        reset={reset}
      />
      <ul className="lap-container">
        <LiveLap
          totalElapsedTime={totalElapsedTime}
          sumOfAllLapTimes={sumOfAllLapTimes}
          formatTime={formatTime}
          laps={laps}
        />
        <Laps laps={laps} totalElapsedTime={totalElapsedTime} />
      </ul>
    </main>
  );
}

export default App;
