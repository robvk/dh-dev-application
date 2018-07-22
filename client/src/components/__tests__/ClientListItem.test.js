import React from "react";
import ReactDOM from "react-dom";

import ClientListItem from "../ClientListItem";

const testClient = {
  id: "59a2afbbfc13ae278700044c",
  first_name: "Rochella",
  last_name: "Chipchase",
  email: "rchipchase0@joomla.org",
  gender: "Female",
  photo: "https://robohash.org/molestiaedoloremquesed.jpg?size=50x50&set=set1",
  origin: "Egypt"
};

it("renders correctly", () => {
  const wrapper = shallow(
    <ClientListItem client={testClient} isSelected={false} />
  );
  expect(wrapper).toMatchSnapshot();
});

it("adds css modifier if selected", () => {
  const wrapper = shallow(<ClientListItem client={testClient} isSelected={true} />);
  expect(wrapper.is(".client-dropdown-list-item--selected")).toBe(true);
});
