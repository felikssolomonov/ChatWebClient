import React from "react"; //
import { combineReducers, createStore, applyMiddleware } from "redux";
import contentReducer from "./Reducers/content_reducer";
import thunkMiddleware from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let rootReducer = combineReducers({
  content: contentReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export { persistor, store };
