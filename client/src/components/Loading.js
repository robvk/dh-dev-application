import React from "react";

import loading from "../assets/loading.svg";
import "./Loading.css";

function Loading(props: {}) {
  return (
    <div className="loading">
      <img src={loading} />
    </div>
  );
}

export default Loading;
