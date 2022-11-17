import React from "react";

const UserCard = (props) => {
  return (
    <div className="row">
      <div className={props.className}>{props.username}</div>

      <div className={props.className}>{props.role}</div>
    </div>
  );
};

export default UserCard;
