import React from "react";
import ReactDOM from "react-dom";
import ClientOverview from "../ClientOverview";

it('renders correctly', () => {
  const wrapper = shallow(<ClientOverview />);
  expect(wrapper).toMatchSnapshot();
});
