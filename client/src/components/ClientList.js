import React from "react";
import map from "lodash/map";

import "./ClientList.css";
import ClientListItem from "./ClientListItem";
import type { Client } from "../lib/flowTypes";

type Props = {
  clients: Array<Client>,
  selectedClient: Client
};

const ClientList = (props: Props) => {
  const { clients, selectedClient } = props;
  return (
    <div className="client-dropdown-list">
      {map(clients, client => (
        <ClientListItem
          key={client.id}
          client={client}
          isSelected={selectedClient && client.id === selectedClient.id}
        />
      ))}
    </div>
  );
};

export default ClientList;
