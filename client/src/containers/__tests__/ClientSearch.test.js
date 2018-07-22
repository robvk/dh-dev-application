import React from "react";
import ReactDOM from "react-dom";

jest.mock("../../api/clientApi.js");
import { findClientsAsync } from "../../api/clientApi";

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

describe("the component", () => {
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
    wrapper.setState({ searchString: "ab", fullClientList: [] });
    expect(wrapper.find(ClientList).length).toEqual(1);
  });

  it("only passes max 10 items to the ClientList", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({ searchString: "ab", fullClientList: manyClients });
    expect(wrapper.find(ClientList).props().clients.length).toEqual(10);
  });

  it("should set client state on receiving data", () => {
    const wrapper = shallow(<ClientSearch />);
    expect(wrapper.state("fullClientList").length).toEqual(0);
    wrapper.instance().onReceiveData(manyClients);
    expect(wrapper.state("fullClientList").length).toEqual(manyClients.length);
  });

  it("should set searchString state from input", () => {
    const wrapper = shallow(<ClientSearch />);
    expect(wrapper.state("searchString")).toEqual("");
    wrapper.find("input").simulate("change", { target: { value: "foo" } });
    expect(wrapper.state("searchString")).toEqual("foo");
  });
});

const clientSearchWithClients = () => {
  const wrapper = shallow(<ClientSearch />);
  wrapper.setState({ fullClientList: manyClients });
  return wrapper;
};

describe("when the user", () => {
  it("presses the down arrow when nothing is selected, the first item is selected", () => {
    const wrapper = clientSearchWithClients();
    expect(
      wrapper.state("fullClientList")[wrapper.state("selectedIndex")]
    ).toBeFalsy();
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("selectedIndex")).toBe(0);
  });

  it("presses the up arrow when the first item is selected, the first item remains selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ selectedIndex: 0 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowUp" });
    expect(wrapper.state("selectedIndex")).toBe(0);
  });

  it("presses the down arrow when the first item is selected, the second item is selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ selectedIndex: 0 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("selectedIndex")).toBe(1);
  });

  it("presses the down arrow when the last item is selected, the last item remains selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ selectedIndex: manyClients.length });
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("selectedIndex")).toBe(manyClients.length);
  });

  it("presses the up arrow when the second item is selected, the first item is selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ selectedIndex: 1 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowUp" });
    expect(wrapper.state("selectedIndex")).toBe(0);
  });

  it("presses the down arrow when the ninth item is selected, the next page of clients are shown", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ searchString: "as", selectedIndex: 9 });
    expect(wrapper.instance().clientsToDisplay()[0].id).toBe(manyClients[0].id);
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.instance().clientsToDisplay()[0].id).toBe(
      manyClients[10].id
    );
  });
});
