import React, { Component } from "react";
import slice from "lodash/slice";
import classNames from "classnames";

import "./ClientSearch.css";
import { findClientsAsync } from "../api/clientApi";
import DropdownListPage from "../components/DropdownListPage";
import ClientListItem from "../components/ClientListItem";

import type { Client } from "../lib/flowTypes";

type State = {
  searchString: string,
  fullClientList: Array<Client>,
  totalCount: number,
  highlightedIndex: number,
  focused: boolean,
  currentPage: number,
  loading: boolean
};

const maxElementsToShow = 10;

class ClientSearch extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      searchString: "",
      fullClientList: [],
      totalCount: 0,
      highlightedIndex: -1,
      focused: false,
      currentPage: 1,
      loading: false
    };

    this.inputChanged.bind(this);
    this.inputKeyPressed.bind(this);
    this.clientsToDisplay.bind(this);
  }

  inputChanged(newInputString: string) {
    this.setState({
      ...this.state,
      fullClientList: [],
      searchString: newInputString,
      highlightedIndex: -1,
      currentPage: 1
    });

    if (newInputString.length > 0) {
      this.setState({
        loading: true
      });
      findClientsAsync(
        newInputString,
        maxElementsToShow,
        0,
        this.onReceiveData.bind(this)
      );
    }
  }

  onReceiveData(clientList: Array<Client>, totalCount: number) {
    this.setState({
      ...this.state,
      totalCount,
      loading: false,
      fullClientList: this.state.fullClientList.concat(clientList)
    });
  }

  pageStartIndex(page: number = this.state.currentPage) {
    return (page - 1) * maxElementsToShow;
  }

  pageEndIndex(page: number = this.state.currentPage) {
    return page * maxElementsToShow - 1;
  }

  inputKeyPressed(key: string) {
    if (key === "ArrowDown") {
      const { highlightedIndex, fullClientList } = this.state;
      const pageStart = this.pageStartIndex();
      const pageEnd = this.pageEndIndex();

      if (highlightedIndex < pageStart || highlightedIndex > pageEnd) {
        this.setState({
          ...this.state,
          highlightedIndex: pageStart
        });
      } else if (highlightedIndex === pageEnd) {
        this.gotoNextPage();
      } else if (fullClientList[highlightedIndex + 1]) {
        this.setState({
          ...this.state,
          highlightedIndex: highlightedIndex + 1
        });
      }
    } else if (key === "ArrowUp") {
      const { highlightedIndex } = this.state;
      const pageStart = this.pageStartIndex();
      const pageEnd = this.pageEndIndex();

      if (highlightedIndex < pageStart || highlightedIndex > pageEnd) {
        this.setState({
          ...this.state,
          highlightedIndex: pageEnd
        });
      } else if (highlightedIndex === pageStart) {
        this.gotoPreviousPage();
      } else {
        this.setState({
          ...this.state,
          highlightedIndex: highlightedIndex - 1
        });
      }
    }
  }

  gotoPreviousPage() {
    const { currentPage, highlightedIndex } = this.state;
    if (!(currentPage === 1)) {
      const page = currentPage - 1;
      this.setState({
        ...this.state,
        currentPage: page,
        highlightedIndex: this.hasHighlighted()
          ? this.pageEndIndex(page)
          : highlightedIndex
      });
    }
  }

  gotoNextPage() {
    if (this.hasNextPage()) {
      const {
        searchString,
        currentPage,
        highlightedIndex,
        fullClientList
      } = this.state;
      const nextPage = currentPage + 1;

      this.setState({
        ...this.state,
        currentPage: nextPage,
        highlightedIndex: this.hasHighlighted()
          ? this.pageStartIndex(nextPage)
          : highlightedIndex
      });

      if (fullClientList.length < nextPage * maxElementsToShow) {
        this.setState({
          loading: true
        });
        findClientsAsync(
          searchString,
          maxElementsToShow,
          currentPage * maxElementsToShow,
          this.onReceiveData.bind(this)
        );
      }
    }
  }

  onBlur() {
    this.setState({ ...this.state, focused: false });
  }

  onFocus() {
    this.setState({ ...this.state, focused: true });
  }

  clientsToDisplay() {
    const { fullClientList } = this.state;
    const startIndex = this.startIndex();
    return slice(fullClientList, startIndex, startIndex + maxElementsToShow);
  }

  startIndex() {
    return (this.state.currentPage - 1) * maxElementsToShow;
  }

  hasHighlighted() {
    return this.state.highlightedIndex >= 0;
  }

  highlightedIndexOnPage() {
    const { highlightedIndex } = this.state;
    return this.hasHighlighted() ? highlightedIndex - this.startIndex() : null;
  }

  hasNextPage() {
    const { currentPage, totalCount } = this.state;
    return currentPage * maxElementsToShow < totalCount;
  }

  render() {
    const { loading, searchString, focused, totalCount } = this.state;
    const displayClients = focused ? this.clientsToDisplay() : [];
    const dropdownShowing = !!searchString && focused;
    const highlightedIndex = this.highlightedIndexOnPage();

    return (
      <div className="client-search">
        <input
          className={classNames("client-search__field", {
            "client-search--dropdown-showing": dropdownShowing
          })}
          type="text"
          value={searchString}
          onChange={event => this.inputChanged(event.target.value)}
          onKeyDown={event => this.inputKeyPressed(event.key)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        {dropdownShowing ? (
          <DropdownListPage
            list={displayClients}
            totalCount={totalCount}
            startNumber={this.startIndex() + 1}
            loading={loading}
            renderItem={(item, idx) => (
              <ClientListItem
                key={item.id}
                client={item}
                isSelected={idx === highlightedIndex}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default ClientSearch;
