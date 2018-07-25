import React from "react";
import ReactDOM from "react-dom";

import DropdownListPage from "../DropdownListPage";

const manyClients = Array(10).fill({
  id: "59a2afbbfc13ae278700044e",
  first_name: "Bartram",
  last_name: "Nassi",
  email: "bnassi2@goodreads.com",
  gender: "Male",
  photo: "https://robohash.org/aeablanditiis.bmp?size=50x50&set=set1",
  origin: "Egypt"
});

const testProps = {
  list: manyClients,
  renderItem: () => {},
  startNumber: 1,
  totalCount: 20,
  loading: false
};

it("renders correctly", () => {
  const wrapper = shallow(<DropdownListPage />);
  wrapper.setProps(testProps);
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when loading", () => {
  const wrapper = shallow(<DropdownListPage />);
  wrapper.setProps({ ...testProps, loading: true });
  expect(wrapper).toMatchSnapshot();
});

it("renders correctly when empty", () => {
  const wrapper = shallow(<DropdownListPage />);
  wrapper.setProps({ ...testProps, list: [], totalCount: 0 });
  expect(wrapper).toMatchSnapshot();
});
