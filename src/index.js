import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";
import Layout from "./layout/Layout";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <Layout />
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
