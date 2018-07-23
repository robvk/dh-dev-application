import React from "react";
import ReactDOM from "react-dom";

import NoResult from "../NoResult";

it("renders correctly", () => {
  const wrapper = shallow(<NoResult />);
  expect(wrapper).toMatchSnapshot();
});
