import BlankLaps from "./BlankLaps";
import "./Buttons.css";

//component
function Buttons({
  totalElapsedTime,
  isTimerRunning,
  setIsTimerRunning,
  formatTime,
  laps,
  updateLaps,
  blankLaps,
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

    // TODO: implement empty laps and use this update function
    updateBlankLaps((current) => current.slice(1));
    console.log(blankLaps);

    setSumOfAllLapTimes(totalElapsedTime);
  }

  return (
    <section className="button-container">
      <button
        id="left-button"
        className={
          "apple-button " + (isTimerRunning ? "lap-button" : "reset-button")
        }
        onClick={() => {
          isTimerRunning ? handleLap() : reset();
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
          isTimerRunning ? setIsTimerRunning(false) : setIsTimerRunning(true);
        }}
      >
        {isTimerRunning ? "Stop" : "Start"}
      </button>
    </section>
  );
}

export default Buttons;
