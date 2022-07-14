export const initialState = {
  isTimerRunning: false,
  totalElapsedTime: 0,
  laps: [],
  blankLaps: [],
  lapContainerHeight: 0,
  lapRowHeight: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_START_STOP":
      return { ...state, isTimerRunning: !state.isTimerRunning };
    case "UPDATE_TIME":
      return {
        ...state,
        totalElapsedTime: action.payload,
      };
    case "UPDATE_LAPS":
      return { ...state, laps: action.payload };
    case "UPDATE_BLANK_LAPS":
      return { ...state, blankLaps: action.payload };
    case "SET_LAP_CONTAINER_HEIGHT":
      return { ...state, lapContainerHeight: action.payload };
    case "SET_LAP_ROW_HEIGHT":
      return { ...state, lapRowHeight: action.payload };
    case "RESET":
      return {
        ...initialState,
        lapContainerHeight: state.lapContainerHeight,
        lapRowHeight: state.lapRowHeight,
      };
    default:
      throw new Error();
  }
}
