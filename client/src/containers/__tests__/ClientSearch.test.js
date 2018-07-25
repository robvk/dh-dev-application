import React from "react";
import ReactDOM from "react-dom";

jest.mock("../../api/clientApi.js");
import { findClientsAsync } from "../../api/clientApi";

import ClientSearch from "../ClientSearch";
import DropdownListPage from "../../components/DropdownListPage";

const manyClients = Array(15).fill({
  id: "59a2afbbfc13ae278700044e",
  first_name: "Bartram",
  last_name: "Nassi",
  email: "bnassi2@goodreads.com",
  gender: "Male",
  photo: "https://robohash.org/aeablanditiis.bmp?size=50x50&set=set1",
  origin: "Egypt"
});

findClientsAsync.mockImplementation((newInputString, limit, offset, callback) =>
  callback(manyClients.slice(offset, offset + limit))
);

describe("the component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ClientSearch />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly without results", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({ searchString: "ab", fullClientList: [], focused: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with results", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({
      searchString: "ab",
      fullClientList: manyClients,
      focused: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("hides the dropdown when there is no input", () => {
    const wrapper = shallow(<ClientSearch />);
    expect(wrapper.find(DropdownListPage).length).toEqual(0);
  });

  it("shows the dropdown when there is input and focus", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({ searchString: "ab", fullClientList: [], focused: true });
    expect(wrapper.find(DropdownListPage).length).toEqual(1);
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

  it("should change focus when the user focuses the input box", () => {
    const wrapper = shallow(<ClientSearch />);
    expect(wrapper.state("focused")).toEqual(false);
    wrapper.find("input").simulate("focus");
    expect(wrapper.state("focused")).toEqual(true);
  });

  it("should remove focus when the user clicks outside the input box", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.find("input").simulate("focus");
    expect(wrapper.state("focused")).toEqual(true);
    wrapper.find("input").simulate("blur");
    expect(wrapper.state("focused")).toEqual(false);
  });

  it("should update the list when going to next page", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({
      searchString: "",
      fullClientList: manyClients.slice(0, 10),
      totalCount: 15,
      highlightedIndex: 2,
      focused: true,
      currentPage: 1,
      loading: false
    });
    expect(wrapper.state("fullClientList").length).toEqual(10);
    wrapper.instance().gotoNextPage();
    expect(wrapper.state("fullClientList").length).toEqual(15);
  });

  it("should update the visible list when going to a previous page", () => {
    const wrapper = shallow(<ClientSearch />);
    wrapper.setState({
      searchString: "",
      fullClientList: manyClients,
      totalCount: 15,
      highlightedIndex: -1,
      focused: true,
      currentPage: 2,
      loading: false
    });
    expect(wrapper.instance().clientsToDisplay()[0]).toEqual(manyClients[10]);
    wrapper.instance().gotoPreviousPage();
    expect(wrapper.instance().clientsToDisplay()[0]).toEqual(manyClients[0]);
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
      wrapper.state("fullClientList")[wrapper.state("highlightedIndex")]
    ).toBeFalsy();
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("highlightedIndex")).toBe(0);
  });

  it("presses the up arrow when the first item is selected, the first item remains selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ highlightedIndex: 0 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowUp" });
    expect(wrapper.state("highlightedIndex")).toBe(0);
  });

  it("presses the down arrow when the first item is selected, the second item is selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ highlightedIndex: 0 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("highlightedIndex")).toBe(1);
  });

  it("presses the down arrow when the last item is selected, the last item remains selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ currentPage: 2, highlightedIndex: 15 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.state("highlightedIndex")).toBe(15);
  });

  it("presses the up arrow when the second item is selected, the first item is selected", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ highlightedIndex: 1 });
    wrapper.find("input").simulate("keyDown", { key: "ArrowUp" });
    expect(wrapper.state("highlightedIndex")).toBe(0);
  });

  it("presses the down arrow when the ninth item is selected, the next page of clients are shown", () => {
    const wrapper = clientSearchWithClients();
    wrapper.setState({ searchString: "as", highlightedIndex: 9 });
    expect(wrapper.instance().clientsToDisplay()[0].id).toBe(manyClients[0].id);
    wrapper.find("input").simulate("keyDown", { key: "ArrowDown" });
    expect(wrapper.instance().clientsToDisplay()[0].id).toBe(
      manyClients[10].id
    );
  });
});
