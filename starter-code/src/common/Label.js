import React from "react";

const Label = (props) => {
  return (
    <label for="html" className={props.className}>
      {props.value}
    </label>
  );
};

export default Label;
