import React from "react";
import { useParams } from "react-router-dom";
const OrgHome = (props) => {
  let { org } = useParams();
  return (
    <div>
      <h3>ID: {org}</h3>
    </div>
  );
};

export default OrgHome;
