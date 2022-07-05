import "./Laps.css";

function BlankLaps({ blankLaps }) {
  return blankLaps.map((lap) => (
    <li className={"row-container blank-row"} key={lap.number}>
      <p>Lap {lap.number}</p>
      <p>{lap.formattedTime}</p>
    </li>
  ));
}

export default BlankLaps;
