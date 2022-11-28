import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
const Adminmain = () => {
  const navigate = useNavigate();
  const handleNew = () => {
    navigate("/newuser");
  };
  const handlealluser = () => {
    navigate("/alluser");
  };
  const handleExit = () => {
    navigate("/login");
  };
  return (
    <div>
      <h2>Admin page</h2>
      <Button className="buttonNew" type="button" onClick={() => handleNew()}>
        Create New User
      </Button>
      <Button
        className="buttonList"
        type="button"
        onClick={() => handlealluser()}
      >
        View All User
      </Button>
      <Button className="buttonList" type="button" onClick={() => handleExit()}>
        Exit
      </Button>
    </div>
  );
};

export default Adminmain;
