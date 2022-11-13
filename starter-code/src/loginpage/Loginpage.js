import React, { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";

import "../loginpage/loginpage.css";
const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await fetch("http://127.0.0.1:5001/users/login", {
        method: "POST",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUsername("");
      setPassword("");
    } else {
      alert("Please insert the username of password");
    }
  };

  return (
    <div className="login">
      <div className="username">
        <Label value="username" />
        <p />
        <Input
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
        <Input
          className="inputBox "
          value={password}
          type="text"
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
      />
    </div>
  );
};

export default Loginpage;
