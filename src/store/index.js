//import React from "react"
import { createStore , applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./saga"
import throttle from "lodash.throttle"

// Load persisted store state
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

//Persist the store state
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};



//Store configurations
const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();
export const store = createStore( rootReducer ,persistedState,applyMiddleware( sagaMiddleware ));
//export const store = createStore( rootReducer ,applyMiddleware( sagaMiddleware ));
sagaMiddleware.run(rootSaga);

  store.subscribe(throttle(() => {
    saveState({
        notification: store.getState().notification
    });
  }, 1000));  

