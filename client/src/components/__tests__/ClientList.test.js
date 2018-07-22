import React from "react";
import ReactDOM from "react-dom";

import ClientList from "../ClientList";

const testProps = {
  clients: [
    {
      id: "59a2afbbfc13ae278700044c",
      first_name: "Rochella",
      last_name: "Chipchase",
      email: "rchipchase0@joomla.org",
      gender: "Female",
      photo:
        "https://robohash.org/molestiaedoloremquesed.jpg?size=50x50&set=set1",
      origin: "Egypt"
    },
    {
      id: "59a2afbbfc13ae278700044d",
      first_name: "Sophia",
      last_name: "Mayler",
      email: "smayler1@goo.ne.jp",
      gender: "Female",
      photo:
        "https://robohash.org/perspiciatisoditatque.png?size=50x50&set=set1",
      origin: "Zimbabwe"
    },
    {
      id: "59a2afbbfc13ae278700044e",
      first_name: "Bartram",
      last_name: "Nassi",
      email: "bnassi2@goodreads.com",
      gender: "Male",
      photo: "https://robohash.org/aeablanditiis.bmp?size=50x50&set=set1",
      origin: "Egypt"
    }
  ]
};

it("renders correctly", () => {
  const wrapper = shallow(<ClientList />);
  wrapper.setProps(testProps);
  expect(wrapper).toMatchSnapshot();
});

it("has a child for every client", () => {
  const wrapper = shallow(<ClientList />);
  wrapper.setProps(testProps);
  expect(wrapper.find("ClientListItem").length).toBe(3);
});
