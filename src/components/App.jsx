import { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./Laps.css";
import Time from "./Time";
import Buttons from "./Buttons";
import LiveLap from "./LiveLap";
import Laps from "./Laps";

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [laps, updateLaps] = useState([]);
  const [sumOfAllLapTimes, setSumOfAllLapTimes] = useState(0);
  // these useStates should be in the Laps component, but there is no way to communicate to that component to reset it from the Buttons component, where the reset button will be clicked
  const [slowLapIndex, setSlowLapIndex] = useState(0);
  const [slowLapTime, setSlowLapTime] = useState(Number.NEGATIVE_INFINITY);
  const [fastLapIndex, setFastLapIndex] = useState(0);
  const [fastLapTime, setFastLapTime] = useState(Number.POSITIVE_INFINITY);
  const [lapContainerHeight, setLapContainerHeight] = useState(0);
  const [lapRowHeight, setLapRowHeight] = useState(0);

  const lapcontainerref = useCallback((node) => {
    if (node !== null) {
      setLapContainerHeight(node.getBoundingClientRect().height);
      console.log("container height: ", node.getBoundingClientRect().height);
    }
  }, []);
  const laprowref = useCallback((node) => {
    if (node !== null) {
      setLapRowHeight(node.getBoundingClientRect().height);
      console.log("row height: ", node.getBoundingClientRect().height);
    }
  }, []);

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

  function createBlankRows() {}

  function reset() {
    setTotalElapsedTime(0);
    setSumOfAllLapTimes(0);
    updateLaps([]);
    resetFastSlowLaps();
  }

  function resetFastSlowLaps() {
    setSlowLapIndex(0);
    setSlowLapTime(Number.NEGATIVE_INFINITY);
    setFastLapIndex(0);
    setFastLapTime(Number.POSITIVE_INFINITY);
  }

  return (
    <main className="content-container">
      <Time totalElapsedTime={totalElapsedTime} formatTime={formatTime} />
      <Buttons
        totalElapsedTime={totalElapsedTime}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        formatTime={formatTime}
        laps={laps}
        updateLaps={updateLaps}
        sumOfAllLapTimes={sumOfAllLapTimes}
        setSumOfAllLapTimes={setSumOfAllLapTimes}
        reset={reset}
      />
      <ul className="lap-container" ref={lapcontainerref}>
        {totalElapsedTime > 0 ? (
          <LiveLap
            totalElapsedTime={totalElapsedTime}
            sumOfAllLapTimes={sumOfAllLapTimes}
            formatTime={formatTime}
            laps={laps}
          />
        ) : (
          <li className="row-container blank-row" ref={laprowref}>
            <p>-</p>
            <p>-</p>
          </li>
        )}
        <Laps
          laps={laps}
          slowLapTime={slowLapTime}
          slowLapIndex={slowLapIndex}
          setSlowLapTime={setSlowLapTime}
          setSlowLapIndex={setSlowLapIndex}
          fastLapTime={fastLapTime}
          fastLapIndex={fastLapIndex}
          setFastLapTime={setFastLapTime}
          setFastLapIndex={setFastLapIndex}
        />
      </ul>
      {createBlankRows()}
    </main>
  );
}

export default App;
