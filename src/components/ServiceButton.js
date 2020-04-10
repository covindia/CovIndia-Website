import React from "react";
import "../App.css";

import { FormattedMessage } from "react-intl";
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
      {/* <FormattedMessage id={props.name} className="btn-text" /> */}
      {/* <span className="btn-text" id={`${props.name}Text`}>
          {props.name}
        </span> */}
    </button>
  );
};

export default ServiceButton;
