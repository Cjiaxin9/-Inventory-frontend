import React from "react";

const MainCard = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.date}</div>
      <div className={props.className}>{props.location}</div>
      <div className={props.className}>{props.category}</div>
    </div>
  );
};

export default MainCard;
