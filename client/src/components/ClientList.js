import React from "react";
import _ from "lodash";

import "./ClientList.css";

const ClientList = ({ clients }) => {
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
