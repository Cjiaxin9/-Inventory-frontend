import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import "../main/Admin.css";
const Intro = () => {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/login");
  };
  return (
    <div>
      <h2>An inventory for Vending Nation company</h2>
      <div className="into">
        <p />
        <h3>Background of Vending Nation</h3>
        <lu>
          {" "}
          - inventory tracking system for drinks and snacks in vending machines
        </lu>
        <p />
        <lu>
          - by using this app, the workers can record the quantity of drinks and
          snacks in a machine
        </lu>
        <p />
        <h4>Different Users</h4>
        <li>Admin</li>
        <lu>- can create new users</lu>
        <p />
        <lu>- change user's role and username</lu>
        <p />
        <li>Worker</li>
        <p />
        <lu>
          - can create a new withdraw list to record the drinks quantity in
          vending machine
        </lu>
        <p />
        <lu>- can view and edit all the withdraw lists that were created</lu>
        <p />
      </div>
      <Button
        className="buttonlogin btn-default"
        type="button"
        onClick={() => handleback()}
      >
        Let start the DEMO
      </Button>
    </div>
  );
};

export default Intro;
