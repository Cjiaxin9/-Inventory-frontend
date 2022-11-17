import React from "react";

const Card = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.product_name}</div>
      <div className={props.className}>{props.Qty}</div>
      <div className={props.className}>{props.unit}</div>
      <div className={props.className}>{props.remark}</div>
    </div>
  );
};

export default Card;
