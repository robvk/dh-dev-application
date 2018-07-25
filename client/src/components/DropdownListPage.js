import React from "react";
import map from "lodash/map";

import NoResult from "./NoResult";
import Loading from "./Loading";

import "./DropdownListPage.css";

type Props = {
  list: Array<any>,
  renderItem: Function,
  startNumber: number,
  totalCount: number,
  loading: boolean
};

const DropdownListPage = (props: Props) => {
  const { loading, list, renderItem, totalCount, startNumber } = props;

  if (loading)
    return (
      <div className="dropdown-list">
        <Loading />
      </div>
    );

  if (!list || list.length === 0)
    return (
      <div className="dropdown-list">
        <NoResult />
      </div>
    );

  return (
    <div className="dropdown-list">
      {map(list, (item, index) => renderItem(item, index))}
      <div className="dropdown-list-bottom-text">{`${startNumber}-${startNumber +
        list.length -
        1} of ${totalCount} results`}</div>
    </div>
  );
};

export default DropdownListPage;
