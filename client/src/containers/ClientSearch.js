import React, { Component } from "react";
import _ from "lodash";

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

    return (
      <div>
        <input
          type="text"
          value={searchString}
          onChange={event => this.inputChanged(event.target.value)}
        />
        {_.map(clients, client => {
          return (
            <p key={client.id}>
              {client.first_name} {client.last_name} from {client.origin}
            </p>
          );
        })}
      </div>
    );
  }
}

export default ClientSearch;
