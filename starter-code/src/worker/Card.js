import React from "react";

const Card = (props) => {
  return (
    <div className="row">
      <div className="col">{props.product_name}</div>
      <div className="col">{props.Qty}</div>
      <div className="col">{props.unit}</div>
      <div className="col">{props.remark}</div>
    </div>
  );
};

export default Card;
