import React from "react";

const CardCompany = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.company}</div>
    </div>
  );
};

export default CardCompany;
