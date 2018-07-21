import React, { Component } from 'react';
import ClientSearch from '../containers/ClientSearch';

/**
 * A non-descript app page where our search component could live
 */

class ClientOverview extends Component {
  render() {
    return (
      <div>
        <ClientSearch />
      </div>
    );
  }
}

export default ClientOverview;
