import React from "react";

const CardUnit = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.unit}</div>
    </div>
  );
};

export default CardUnit;
