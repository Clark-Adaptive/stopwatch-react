import "./Buttons.css";

//component
function Buttons({ setTotalElapsedTime, isTimerRunning, setIsTimerRunning }) {
  return (
    <section className="button-container">
      <button
        id="left-button"
        className={
          "apple-button " + (isTimerRunning ? "lap-button" : "reset-button")
        }
        onClick={() => {
          isTimerRunning ? console.log("lap") : setTotalElapsedTime(0);
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
