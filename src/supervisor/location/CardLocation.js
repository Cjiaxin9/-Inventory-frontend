import React from "react";

const CardLocation = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.location}</div>
    </div>
  );
};

export default CardLocation;
