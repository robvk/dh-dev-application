import * as React from "react";
import classNames from "classnames";

import "./ClientListItem.css";

type ClientList = {
  origin: string,
  first_name: string,
  last_name: string
};

type Props = {
  client: ClientList,
  isSelected: boolean
};

function ClientListItem(props: Props) {
  const { client, isSelected } = props;
  const { first_name, last_name, origin } = client;

  return (
    <div
      className={classNames("client-dropdown-list-item", {
        "client-dropdown-list-item--selected": isSelected
      })}
    >
      {first_name} {last_name} from {origin}
    </div>
  );
}

export default ClientListItem;
