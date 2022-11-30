import React from "react";

const CardProduct = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.product_name}</div>
    </div>
  );
};

export default CardProduct;
