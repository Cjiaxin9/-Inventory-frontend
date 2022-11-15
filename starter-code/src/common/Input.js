import React from "react";

const Input = (props) => {
  return (
    <input
      className={props.className}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      {...props.register(props.inputName)}
      style={{ minWidth: 0, width: "100%" }}
    />
  );
};

export default Input;
