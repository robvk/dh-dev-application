import React from "react";
import map from "lodash/map";

import "./ClientList.css";
import ClientListItem from "./ClientListItem";
import NoResult from "./NoResult";
import type { Client } from "../lib/flowTypes";

type Props = {
  clients: Array<Client>,
  selectedClient: Client
};

const ClientList = (props: Props) => {
  const { clients, selectedClient } = props;

  return (
    <div className="client-dropdown-list">
      {clients && clients.length > 0 ? (
        map(clients, client => (
          <ClientListItem
            key={client.id}
            client={client}
            isSelected={selectedClient && client.id === selectedClient.id}
          />
        ))
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default ClientList;
