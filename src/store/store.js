import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import {userDetailsReducer} from "./reducers/useDataReducer"
import thunk from "redux-thunk";
const initialState = {};
const reducer = combineReducers({
  userDetails: userDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;