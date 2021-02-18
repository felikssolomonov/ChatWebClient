import {combineReducers, createStore, applyMiddleware} from 'redux';
import contentReducer from "./Reducers/content_reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
	content: contentReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;