import { useState, useEffect, useRef, useReducer } from "react";
import "./App.css";
import "./Laps.css";
import Time from "./Time";
import Buttons from "./Buttons";
import LiveLap from "./LiveLap";
import Laps from "./Laps";
import BlankLaps from "./BlankLaps";

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
  const [blankLaps, updateBlankLaps] = useState([]);
  const lapContainerRef = useRef(null);
  const lapRowRef = useRef(null);

  const initialState = {
    isTimerRunning: false,
    startTime: 0,
    totalElapsedTime: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "TOGGLE_START_STOP":
        return { ...state, isTimerRunning: !state.isTimerRunning };
      case "RECORD_START_TIME":
        return { ...state, startTime: Date.now() };

      case "UPDATE_TIME":
        console.log(state.startTime);
        return {
          ...state,
          totalElapsedTime:
            Date.now() - state.startTime + state.totalElapsedTime,
        };
        break;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(startStopStopwatch, [state.isTimerRunning]);
  useEffect(() => {
    if (
      lapContainerRef.current.clientHeight &&
      lapRowRef.current.clientHeight
    ) {
      setLapContainerHeight(lapContainerRef.current.clientHeight);
      setLapRowHeight(lapRowRef.current.clientHeight);
      const numEmptyLaps = Math.floor(
        lapContainerRef.current.clientHeight / lapRowRef.current.clientHeight
      );

      updateBlankLaps(
        Array(numEmptyLaps - 1)
          .fill({ number: 0, time: "-", formattedTime: "-" })
          .map((item, index) => ({ ...item, number: index }))
      );
    } else {
      console.log("lapContainerRef or lapRowRef is not a number");
    }
  }, []);

  function createEmptyLapArray() {
    let emptyLaps = [];
    const numEmptyLaps = Math.floor(lapContainerHeight / lapRowHeight);
    for (let a = 0; a < numEmptyLaps - 1; a++) {
      // for (let a = 0; a < 8 - 1; a++) {
      emptyLaps.push({ number: a, time: "-", formattedTime: "-" });
    }
    return emptyLaps;
  }

  function startStopStopwatch() {
    if (state.isTimerRunning) {
      // start the stopwatch
      dispatch({ type: "RECORD_START_TIME" });
      const intervalID = setInterval(() => {
        dispatch({ type: "UPDATE_TIME" });
      }, 1000 / 60);
      return () => {
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
    resetFastSlowLaps();
    updateBlankLaps(createEmptyLapArray);
  }

  function resetFastSlowLaps() {
    setSlowLapIndex(0);
    setSlowLapTime(Number.NEGATIVE_INFINITY);
    setFastLapIndex(0);
    setFastLapTime(Number.POSITIVE_INFINITY);
  }

  return (
    <main className="content-container">
      <Time state={state} formatTime={formatTime} />
      <Buttons
        state={state}
        dispatch={dispatch}
        totalElapsedTime={totalElapsedTime}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        formatTime={formatTime}
        laps={laps}
        updateLaps={updateLaps}
        blankLaps={blankLaps}
        updateBlankLaps={updateBlankLaps}
        sumOfAllLapTimes={sumOfAllLapTimes}
        setSumOfAllLapTimes={setSumOfAllLapTimes}
        reset={reset}
      />
      <ul className="lap-container" ref={lapContainerRef}>
        {totalElapsedTime > 0 ? (
          <LiveLap
            totalElapsedTime={totalElapsedTime}
            sumOfAllLapTimes={sumOfAllLapTimes}
            formatTime={formatTime}
            laps={laps}
          />
        ) : (
          <li className="row-container blank-row" ref={lapRowRef}>
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
        <BlankLaps blankLaps={blankLaps} />
      </ul>
    </main>
  );
}

export default App;
