import "./Buttons.css";

//component
function Buttons({
  dispatch,
  isTimerRunning,
  totalElapsedTime,
  formatTime,
  laps,
  blankLaps,
  createEmptyLapArray,
}) {
  function handleLap() {
    const sumOfAllLapTimes =
      laps.length > 0
        ? laps.reduce((accumulator, current) => accumulator + current.time, 0)
        : 0;
    dispatch({
      type: "UPDATE_LAPS",
      payload: [
        ...laps,
        {
          number: laps.length + 1,
          time: totalElapsedTime - sumOfAllLapTimes,
          formattedTime: formatTime(totalElapsedTime - sumOfAllLapTimes),
        },
      ],
    });
    dispatch({ type: "UPDATE_BLANK_LAPS", payload: blankLaps.slice(1) });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
    createEmptyLapArray();
  }

  return (
    <section className="button-container">
      <button
        id="left-button"
        className={
          "apple-button " + (isTimerRunning ? "lap-button" : "reset-button")
        }
        onClick={() => {
          isTimerRunning ? handleLap() : handleReset();
        }}
      >
        {isTimerRunning ? "Lap" : "Reset"}
      </button>
      <button
        id="right-button"
        className={
          "apple-button " + (isTimerRunning ? "stop-button" : "start-button")
        }
        onClick={() => {
          dispatch({ type: "TOGGLE_START_STOP" });
        }}
      >
        {isTimerRunning ? "Stop" : "Start"}
      </button>
    </section>
  );
}

export default Buttons;
