import React from "react";
import "../App.css";

import transalte from "../i18n/translate";

const ServiceButton = (props) => {
  return (
    <button
      className="help-button"
      name={props.name}
      id={props.name}
      onClick={props.getLocation}
    >
      <img
        alt={props.name}
        className="img img-icon materialboxed"
        name={props.name}
        id={props.name}
        src={`${process.env.PUBLIC_URL}/${props.name}.png`}
      />

      {transalte(props.name)}
    </button>
  );
};

export default ServiceButton;
