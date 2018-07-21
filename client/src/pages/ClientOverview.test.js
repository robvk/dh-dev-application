import React from "react";
import ReactDOM from "react-dom";
import ClientOverview from "./ClientOverview";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ClientOverview />, div);
  ReactDOM.unmountComponentAtNode(div);
});
