import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ClientOverview from "./pages/ClientOverview";

const root: ?Element = document.getElementById("root");

if (root) {
  ReactDOM.render(<ClientOverview />, root);
} else {
  console.log("No root element found");
}
