const redux = require("redux");

// Reducer function
const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === "INCREMENT") {
        return {
            counter: state.counter + 1,
        };
    }

    if (action.type === "DECREMENT") {
        return {
            counter: state.counter - 1,
        };
    }

    return state;
};

// CENTRAL DATA STORE
const store = redux.createStore(counterReducer);

// Subscriber function/component
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
