import { useEffect, useRef, useReducer } from "react";
import "./App.css";
import "./Laps.css";
import Time from "./Time";
import Buttons from "./Buttons";
import LiveLap from "./LiveLap";
import Laps from "./Laps";
import BlankLaps from "./BlankLaps";
import { initialState, reducer } from "../reducer";

function App() {
  const lapContainerRef = useRef(null);
  const lapRowRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(startStopStopwatch, [state.isTimerRunning]);
  useEffect(() => {
    if (
      lapContainerRef.current.clientHeight &&
      lapRowRef.current.clientHeight
    ) {
      dispatch({
        type: "SET_LAP_CONTAINER_HEIGHT",
        payload: lapContainerRef.current.clientHeight,
      });
      dispatch({
        type: "SET_LAP_ROW_HEIGHT",
        payload: lapRowRef.current.clientHeight,
      });
      const numEmptyLaps = Math.floor(
        lapContainerRef.current.clientHeight / lapRowRef.current.clientHeight
      );

      dispatch({
        type: "UPDATE_BLANK_LAPS",
        payload: Array(numEmptyLaps - 1)
          .fill({ number: 0, time: "-", formattedTime: "-" })
          .map((item, index) => ({ ...item, number: index })),
      });
    } else {
      console.log("lapContainerRef or lapRowRef is not a number");
    }
  }, []);

  function createEmptyLapArray() {
    const numEmptyLaps = Math.floor(
      state.lapContainerHeight / state.lapRowHeight
    );
    dispatch({
      type: "UPDATE_BLANK_LAPS",
      payload: Array(numEmptyLaps - 1)
        .fill({ number: 0, time: "-", formattedTime: "-" })
        .map((item, index) => ({ ...item, number: index })),
    });
  }

  function startStopStopwatch() {
    let intervalID;
    if (state.isTimerRunning) {
      // start the stopwatch
      const startTime = Date.now();
      intervalID = setInterval(() => {
        dispatch({
          type: "UPDATE_TIME",
          payload: state.totalElapsedTime + Date.now() - startTime,
        });
      }, 1000 / 60);
    } else {
      // stop the stopwatch, at the moment, it seems I don't actually need to do anything
    }
    return () => {
      clearInterval(intervalID);
    };
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

  return (
    <main className="content-container">
      <Time totalElapsedTime={state.totalElapsedTime} formatTime={formatTime} />
      <Buttons
        dispatch={dispatch}
        isTimerRunning={state.isTimerRunning}
        totalElapsedTime={state.totalElapsedTime}
        formatTime={formatTime}
        laps={state.laps}
        blankLaps={state.blankLaps}
        createEmptyLapArray={createEmptyLapArray}
      />
      <ul className="lap-container" ref={lapContainerRef}>
        {state.totalElapsedTime > 0 ? (
          <LiveLap
            totalElapsedTime={state.totalElapsedTime}
            formatTime={formatTime}
            laps={state.laps}
          />
        ) : (
          <li className="row-container blank-row" ref={lapRowRef}>
            <p>-</p>
            <p>-</p>
          </li>
        )}
        <Laps laps={state.laps} />
        <BlankLaps blankLaps={state.blankLaps} />
      </ul>
    </main>
  );
}

export default App;
