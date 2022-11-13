import React from "react";

const Button = (props) => {
  // console.log("props", props);

  return (
    <button className={props.className} onClick={props.onClick}>
      {props.input}
    </button>
  );
};

export default Button;
