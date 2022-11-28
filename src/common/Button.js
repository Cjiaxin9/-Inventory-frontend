import React from "react";

const Button = (props) => {
  // console.log("props", props);

  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
