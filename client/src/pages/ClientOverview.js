import React, { Component } from 'react';

import ClientSearch from '../containers/ClientSearch';
import "./ClientOverview.css";

/**
 * A non-descript app page where our search component could live
 */

class ClientOverview extends Component {
  render() {
    return (
      <div className="client-overview-page">
        <ClientSearch />
      </div>
    );
  }
}

export default ClientOverview;
