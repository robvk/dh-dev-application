import React from "react";
import ReactDOM from "react-dom";

jest.mock('../../services/clientApi.js');
import { findClientsAsync } from "../../services/clientApi";

import ClientSearch from "../ClientSearch";
import ClientList from "../../components/ClientList";

const manyClients = Array(15).fill({
  id: "59a2afbbfc13ae278700044e",
  first_name: "Bartram",
  last_name: "Nassi",
  email: "bnassi2@goodreads.com",
  gender: "Male",
  photo: "https://robohash.org/aeablanditiis.bmp?size=50x50&set=set1",
  origin: "Egypt"
});

findClientsAsync.mockImplementation((newInputString, callback) =>
  callback(manyClients)
);

it("renders correctly", () => {
  const wrapper = shallow(<ClientSearch />);
  expect(wrapper).toMatchSnapshot();
});

it("hides the dropdown when there is no input", () => {
  const wrapper = shallow(<ClientSearch />);
  expect(wrapper.find(ClientList).length).toEqual(0);
});

it("shows the dropdown when there is input", () => {
  const wrapper = shallow(<ClientSearch />);
  wrapper.setState({ searchString: "ab", clients: [] });
  expect(wrapper.find(ClientList).length).toEqual(1);
});

it("only passes max 10 items to the ClientList", () => {
  const wrapper = shallow(<ClientSearch />);
  wrapper.setState({ searchString: "ab", clients: manyClients });
  expect(wrapper.find(ClientList).props().clients.length).toEqual(10);
});

it("should set client state on receiving data", () => {
  const wrapper = shallow(<ClientSearch />);
  expect(wrapper.state().clients.length).toEqual(0);
  wrapper.instance().onReceiveData(manyClients);
  expect(wrapper.state().clients.length).toEqual(manyClients.length);
});

it("should set searchString state from input", () => {
  const wrapper = shallow(<ClientSearch />);
  expect(wrapper.state("searchString")).toEqual("");
  wrapper.find("input").simulate("change", { target: { value: "foo" } });
  expect(wrapper.state("searchString")).toEqual("foo");
});
