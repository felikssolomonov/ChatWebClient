// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import { persistor, store } from "./Redux/redux_store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App state={store.getState()} />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
