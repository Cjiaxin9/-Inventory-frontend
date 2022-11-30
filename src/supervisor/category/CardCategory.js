import React from "react";

const CardCategory = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.category}</div>
    </div>
  );
};

export default CardCategory;
