import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import "./StockBalance.css";

const StockBalance_main = () => {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/Supervisormainpage");
  };
  return (
    <div>
      <h2>Stock Balance page</h2>
      <div className="word"> Under construction</div>

      <Button
        className="buttonExit1"
        type="button"
        onClick={() => handleback()}
      >
        Back
      </Button>
    </div>
  );
};

export default StockBalance_main;
