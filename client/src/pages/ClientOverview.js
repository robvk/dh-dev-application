import React from "react";

import ClientSearch from "../containers/ClientSearch";
import "./ClientOverview.css";

/**
 * A non-descript app page where our search component could live
 */

export default (props: {}) => (
  <div className="client-overview-page">
    <ClientSearch />
  </div>
);
