import { useState } from "react";
import "./App.css";

import Time from "./Time";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="content-container">
      <Time />
      <section className="button-container">
        <div id="left-button-container"></div>
        <div id="right-button-container"></div>
      </section>{" "}
      <ul className="lap-container"></ul>
    </main>
  );
}

export default App;
