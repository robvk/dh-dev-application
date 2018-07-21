import React from "react";
import _ from "lodash";

import type { Client } from "../lib";

type Props = {
  clients: Array<Client>
}

const ClientList = (props: Props) => {
  const { clients } = props;
  return (
    <div className="client-dropdown-list">
      {_.map(clients, client => {
        return (
          <div className="client-dropdown-list__item" key={client.id}>
            {client.first_name} {client.last_name} from {client.origin}
          </div>
        );
      })}
    </div>
  );
};

export default ClientList;
