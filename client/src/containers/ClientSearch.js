import React, { Component } from "react";
import slice from "lodash/slice";
import classNames from "classnames";

import "./ClientSearch.css";
import ClientList from "../components/ClientList";
import { findClientsAsync } from "../api/clientApi";

import type { Client } from "../lib/flowTypes";

type State = {
  searchString: string,
  fullClientList: Array<Client>,
  selectedIndex: number
};

const maxElementsToShow = 10;

class ClientSearch extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      fullClientList: [],
      searchString: "",
      selectedIndex: -1
    };

    this.inputChanged.bind(this);
    this.isSearching.bind(this);
    this.inputKeyPressed.bind(this);
    this.clientsToDisplay.bind(this);
    this.onReceiveData.bind(this);
  }

  inputChanged(newInputString: string) {
    this.setState({
      ...this.state,
      searchString: newInputString
    });

    findClientsAsync(newInputString, this.onReceiveData.bind(this));
  }

  onReceiveData(clientList: Array<Client>) {
    this.setState({ ...this.state, fullClientList: clientList });
  }

  inputKeyPressed(key: string) {
    if (key === "ArrowDown") {
      const { selectedIndex, fullClientList } = this.state;
      this.setState({
        ...this.state,
        selectedIndex: neighbouringElementIndexIfPresent(
          fullClientList,
          selectedIndex,
          false
        )
      });
    } else if (key === "ArrowUp") {
      const { selectedIndex, fullClientList } = this.state;
      this.setState({
        ...this.state,
        selectedIndex: neighbouringElementIndexIfPresent(
          fullClientList,
          selectedIndex,
          true
        )
      });
    }
  }

  isSearching() {
    return !!this.state.searchString;
  }

  clientsToDisplay() {
    const { fullClientList, selectedIndex } = this.state;
    return visibleElementsBasedOnIndex(
      fullClientList,
      selectedIndex,
      maxElementsToShow
    );
  }

  selectedClient() {
    const { fullClientList, selectedIndex } = this.state;
    return fullClientList[selectedIndex];
  }

  render() {
    const { searchString } = this.state;
    const isSearching = this.isSearching();
    const displayClients = isSearching ? this.clientsToDisplay() : [];

    return (
      <div className="client-search">
        <input
          className={classNames("client-search__field", {
            "client-search--dropdown-showing": isSearching
          })}
          type="text"
          value={searchString}
          onChange={event => this.inputChanged(event.target.value)}
          onKeyDown={event => this.inputKeyPressed(event.key)}
        />
        {isSearching ? (
          <ClientList
            clients={displayClients}
            selectedClient={this.selectedClient()}
          />
        ) : null}
      </div>
    );
  }
}

//  returns the index of the neighbouring element in the array.
//  If there is no neighbour it will return the given index

const neighbouringElementIndexIfPresent = (
  array: Array<any>,
  index: number,
  selectNext: boolean
): number => {
  const nextIndex = selectNext ? index - 1 : index + 1;
  return array[nextIndex] ? nextIndex : index;
};

//  returns the array of elements that includes the element at visibleItemIndex if the array
//  is split in blocks of maxElementsToShow.
//  (e.g. if we split the array in blocks of 10 and the index is 23, we return elements 20 - 30)
//  If there is no element at visibleItemIndex then the first maxElementsToShow are returned

const visibleElementsBasedOnIndex = (
  array: Array<any>,
  visibleItemIndex: number,
  maxElementsToShow: number
): Array<any> => {
  if (!array[visibleItemIndex]) return slice(array, 0, maxElementsToShow);
  const startIndex =
    Math.floor(visibleItemIndex / maxElementsToShow) * maxElementsToShow;
  return slice(array, startIndex, startIndex + maxElementsToShow);
};

export default ClientSearch;
