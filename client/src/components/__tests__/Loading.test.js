import React from "react";
import ReactDOM from "react-dom";

import Loading from "../Loading";

it("renders correctly", () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper).toMatchSnapshot();
});
