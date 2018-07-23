import React from "react";

import "./NoResult.css";

function NoResult(props: {}) {
  return (
    <div className="no-result">
      <span className="no-result-shrug">¯\_(ツ)_/¯</span>
      <span className="no-result-text">No results found</span>
    </div>
  );
}

export default NoResult;
