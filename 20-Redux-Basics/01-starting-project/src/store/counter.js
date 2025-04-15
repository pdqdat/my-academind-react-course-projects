import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            // Redux Toolkit allows us to mutate the state directly
            // because it uses the `immer` library internally
            // which detects changes and produces a new immutable state
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
