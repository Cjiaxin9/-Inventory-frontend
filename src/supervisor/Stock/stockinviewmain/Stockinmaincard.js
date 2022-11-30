import React from "react";

const Stockinmaincard = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.date}</div>
      <div className={props.className}>{props.company}</div>
      <div className={props.className}>{props.category}</div>
    </div>
  );
};

export default Stockinmaincard;
