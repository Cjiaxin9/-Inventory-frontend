import React from "react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import "./Stock_main.css";

const Stock_main = () => {
  const navigate = useNavigate();
  const handleNew = () => {
    navigate("/New_Stockin");
  };
  const handleList = () => {
    navigate("/view_stockin_main");
  };
  const handleExit = () => {
    navigate("/Supervisormainpage");
  };

  const handleBalance = () => {
    navigate("/view_stockbalance");
  };
  return (
    <div>
      <h2>Stock page</h2>
      <Button className="buttonNew" type="button" onClick={() => handleNew()}>
        Create New Stock In
      </Button>
      <Button className="buttonList" type="button" onClick={() => handleList()}>
        View Stock In Record List
      </Button>
      <Button
        className="buttonList"
        type="button"
        onClick={() => handleBalance()}
      >
        View Balance Stock
      </Button>
      <Button className="buttonExit" type="button" onClick={() => handleExit()}>
        Back
      </Button>
    </div>
  );
};
export default Stock_main;
