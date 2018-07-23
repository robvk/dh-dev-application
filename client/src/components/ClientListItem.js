import * as React from "react";
import classNames from "classnames";

import "./ClientListItem.css";
import placeholder from "../assets/no-photo-placeholder.png";

type ClientList = {
  origin: string,
  first_name: string,
  last_name: string,
  photo: string
};

type Props = {
  client: ClientList,
  isSelected: boolean
};

function ClientListItem(props: Props) {
  const { client, isSelected } = props;
  const { first_name, last_name, origin, photo } = client;

  return (
    <div
      className={classNames("client-dropdown-list-item", {
        "client-dropdown-list-item--selected": isSelected
      })}
    >
      <img
        src={photo ? photo : placeholder}
        className="client-dropdown-list-item-photo"
        alt="client"
      />
      <span className="client-dropdown-list-item-text">
        {first_name} {last_name} from {origin}
      </span>
    </div>
  );
}

export default ClientListItem;
