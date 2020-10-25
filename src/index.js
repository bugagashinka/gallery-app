import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import "lightgallery.js/dist/css/lightgallery.css";
import "styles/styles.scss";
import App from "containers/App";
import db from "./db";

window.db = db;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
