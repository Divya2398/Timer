import { createSlice } from "@reduxjs/toolkit";

const timer = createSlice({
  name: "timer",
  initialState: [],
  reducers: {
    setTime: (state, action) => {
      if (action.payload.type === "start") {
        state = [
          ...state,
          {
            id: action.payload.id,
            startTime: action.payload.time,
            stopTime: "",
          },
        ];
      } else {
        for (let i = 0; i < state.length; i++) {
          if (action.payload.id === state[i].id) {
            state[i].stopTime = action.payload.time;
          }
        }
      }
      return state;
    },
  },
});

export const { setTime } = timer.actions;

export default timer.reducer;
