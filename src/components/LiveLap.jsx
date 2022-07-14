import "./Laps.css";
function LiveLap({ totalElapsedTime, formatTime, laps }) {
  const sumOfAllLapTimes =
    laps.length > 0
      ? laps.reduce((accumulator, current) => accumulator + current.time, 0)
      : 0;
  return (
    <li className="row-container" key="live-lap">
      <p>Lap {laps.length + 1}</p>
      <p>{formatTime(totalElapsedTime - sumOfAllLapTimes)}</p>
    </li>
  );
}

export default LiveLap;
