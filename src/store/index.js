import { createStore, applyMiddleware } from "redux";
import { logicState } from "reducers";
import thunkMiddleware from "redux-thunk";

const store = createStore(logicState, applyMiddleware(thunkMiddleware));

export default store;
