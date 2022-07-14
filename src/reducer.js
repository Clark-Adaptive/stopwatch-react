export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_START_STOP":
      return { ...state, isTimerRunning: !state.isTimerRunning };
    case "RECORD_START_TIME":
      return { ...state, startTime: action.payload };
    case "UPDATE_TIME":
      return {
        ...state,
        totalElapsedTime: action.payload,
      };
    default:
      throw new Error();
  }
}
