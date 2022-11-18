import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Workerpage = () => {
  const navigate = useNavigate();
  const handleNew = () => {
    navigate("/New_withdraw");
  };
  const handleList = () => {
    navigate("/view_withdraw_main");
  };
  const handleExit = () => {
    navigate("/login");
  };
  return (
    <div>
      <h2>Withdraw and record page</h2>
      <Button className="buttonNew" type="button" onClick={() => handleNew()}>
        Create New
      </Button>
      <Button className="buttonList" type="button" onClick={() => handleList()}>
        View Record List
      </Button>
      <Button className="buttonExit" type="button" onClick={() => handleExit()}>
        Exit
      </Button>
    </div>
  );
};

export default Workerpage;
