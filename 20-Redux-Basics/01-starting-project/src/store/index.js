import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

/**
 * If there only 1 slice, we can pass the reducer directly to the store:
 * const store = createStore(counterSlice.reducer);
 *
 * This is the same as:
 * const store = createStore({ counter: counterSlice.reducer });
 */
const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    },
});

export default store;
