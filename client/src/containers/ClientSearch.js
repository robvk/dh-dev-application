import React, { Component } from "react";
import _ from "lodash";

import "./ClientSearch.css";
import ClientList from "../components/ClientList";
import { findClientsAsync } from "../services/clients";

class ClientSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      clients: []
    };

    this.inputChanged.bind(this);
    this.onReceiveData.bind(this);
  }

  onReceiveData(clientList) {
    this.setState({
      ...this.state,
      clients: clientList
    });
  }

  inputChanged(newInputString) {
    this.setState({
      ...this.state,
      searchString: newInputString
    });

    findClientsAsync(newInputString, this.onReceiveData.bind(this));
  }

  render() {
    const { searchString, clients } = this.state;
    const displayClients = searchString ? _.slice(clients, 0, 10) : [];
    const isSearching = !!searchString;

    /* CONSIDERATION: Could have used the classNames library, but only needed this once
       so decided against it for now */
    const searchFieldClassNames = ["client-search__field"];
    if(isSearching) {
      searchFieldClassNames.push("client_search__field--dropdown-showing");
    };

    return (
      <div className="client-search">
        <input
          className={searchFieldClassNames.join(" ")}
          type="text"
          value={searchString}
          onChange={event => this.inputChanged(event.target.value)}
        />
        {isSearching ? <ClientList clients={displayClients} /> : null}
      </div>
    );
  }
}

export default ClientSearch;