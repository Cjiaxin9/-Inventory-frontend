import React, { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "../loginpage/loginpage.css";

const Loginpage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    if (username !== "" && password !== "") {
      e.preventDefault();
      let databody = {
        username: username,
        password: password,
      };
      const res = await fetch(
        "https://inventorybackend-hz92.onrender.com/users/login",
        {
          method: "POST",
          body: JSON.stringify(databody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      // setRole(data);

      setUsername("");
      setPassword("");
      // console.log(data);
      if (data === "WORKER") {
        navigate("/withdrawMain");
      } else if (data === "ADMIN") {
        navigate("/adminpage");
      } else if (data === "SUPERVISOR") {
        navigate("/Supervisormainpage");
      }
    } else {
      alert("Please insert the username of password");
    }
  };

  return (
    <div className="login">
      <div className="username">
        <Label value="username" />
        <p />
        <input
          className="inputBox "
          value={username}
          type="text"
          placeholder="username"
          onChange={handleUsernameChange}
        />
      </div>

      <div className="password">
        <Label value="password" />
        <p />
        <input
          className="inputBox "
          value={password}
          type="password"
          placeholder="password"
          onChange={handlePasswordChange}
        />
      </div>

      <p />
      <Button
        className="submitButton"
        input="Submit"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Loginpage;
