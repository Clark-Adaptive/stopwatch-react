import BlankLaps from "./BlankLaps";
import "./Buttons.css";

//component
function Buttons({
  state,
  dispatch,
  totalElapsedTime,
  isTimerRunning,
  setIsTimerRunning,
  formatTime,
  laps,
  updateLaps,
  updateBlankLaps,
  sumOfAllLapTimes,
  setSumOfAllLapTimes,
  reset,
}) {
  function handleLap() {
    updateLaps((current) => [
      ...current,
      {
        number: laps.length + 1,
        time: totalElapsedTime - sumOfAllLapTimes,
        formattedTime: formatTime(totalElapsedTime - sumOfAllLapTimes),
      },
    ]);
    updateBlankLaps((current) => current.slice(1));
    setSumOfAllLapTimes(totalElapsedTime);
  }

  return (
    <section className="button-container">
      <button
        id="left-button"
        className={
          "apple-button " +
          (state.isTimerRunning ? "lap-button" : "reset-button")
        }
        onClick={() => {
          state.isTimerRunning ? handleLap() : reset();
        }}
      >
        {state.isTimerRunning ? "Lap" : "Reset"}
      </button>
      <button
        id="right-button"
        className={
          "apple-button " +
          (state.isTimerRunning ? "stop-button" : "start-button")
        }
        onClick={() => {
          dispatch({ type: "TOGGLE_START_STOP" });
        }}
      >
        {state.isTimerRunning ? "Stop" : "Start"}
      </button>
    </section>
  );
}

export default Buttons;
