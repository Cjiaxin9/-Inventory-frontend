import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "../worker/worker.css";

const Workerpage = () => {
  const navigate = useNavigate();
  const handleNew = () => {
    navigate("/New_withdraw");
  };
  const handleList = () => {
    navigate("/view_withdraw_main");
  };
  return (
    <div>
      <h1>Withdraw and record page</h1>
      <Button className="buttonNew" type="button" onClick={() => handleNew()}>
        Create New
      </Button>
      <Button className="buttonList" type="button" onClick={() => handleList()}>
        View Record List
      </Button>
    </div>
  );
};

export default Workerpage;
