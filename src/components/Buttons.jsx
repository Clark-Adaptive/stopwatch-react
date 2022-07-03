import "./Buttons.css";

//component
function Buttons({
  totalElapsedTime,
  setTotalElapsedTime,
  isTimerRunning,
  setIsTimerRunning,
  laps,
  updateLaps,
  sumOfAllLapTimes,
  setSumOfAllLapTimes,
}) {
  function handleLap() {
    console.log(laps);
    updateLaps((current) => [
      ...current,
      { number: laps.length + 1, time: totalElapsedTime - sumOfAllLapTimes },
    ]);
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
          isTimerRunning ? handleLap() : setTotalElapsedTime(0);
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
