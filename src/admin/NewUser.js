import React, { useEffect, useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "./user.css";

const NewUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  //role dropdown list
  const [postrole, setPostrole] = useState(null);

  const fetchPostrole = async (url) => {
    setError(null);
    setPostrole(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostrole({
        role: data.role.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/role/allrole";
    fetchPostrole(url);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleroleChange = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = async (e) => {
    if (username !== "" && password !== "" && role !== "") {
      e.preventDefault();
      let databody = {
        username: username,
        password: password,
        role: role,
      };
      const res = await fetch("http://127.0.0.1:5001/users/create", {
        method: "PUT",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setUsername("");
      setPassword("");
      if (data.message == "user created") {
        navigate("/adminpage");
      }
    } else {
      alert("Please insert the username , password and role");
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login">
      <h2>Create New User</h2>
      <p />
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
          type="text"
          placeholder="password"
          onChange={handlePasswordChange}
        />
      </div>
      <div className="Role">
        <Label value="Role" />
        <p />
        <select className="selectbox " onChange={handleroleChange}>
          <option value="" disabled selected hidden>
            Please Select...
          </option>
          {postrole &&
            postrole.role.map((data, i) => {
              return (
                <option value={data.role} key={i}>
                  {data.role}
                </option>
              );
            })}
        </select>
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
      <Button
        className="submitButton"
        input="Submit"
        type="submit"
        onClick={handleBack}
      >
        Back
      </Button>
    </div>
  );
};

export default NewUser;
