import "./Time.css";
function Time({ totalElapsedTime, formatTime }) {
  return (
    <section className="time-container">
      <p className="time-text">{formatTime(totalElapsedTime)}</p>
    </section>
  );
}

export default Time;
