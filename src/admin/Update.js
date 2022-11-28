import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Label from "../common/Label";

const Update = (props) => {
  const navigate = useNavigate();
  const [user, setuser] = useState(props.adminidfromview);
  const [username, setUsername] = useState(user.username);
  const [id, setId] = useState(user.id);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
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

  const handleroleChange = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = async (e) => {
    if (username !== "" && role !== "" && id != "") {
      e.preventDefault();
      let databody = {
        id: id,
        username: username,
        role: role,
      };
      const res = await fetch("http://127.0.0.1:5001/users/update", {
        method: "PATCH",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      //   console.log(data);
      setUsername("");

      if (data.message == "updated successfully") {
        navigate(-1);
      }
    } else {
      alert("Please insert the username  and role");
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login">
      <h2>Update Username or Role </h2>
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

      <div className="Role">
        <Label value="Role" />
        <p />
        <select className="selectbox " onChange={handleroleChange}>
          {postrole &&
            postrole.role.map((data, i) => {
              return (
                <option
                  value={data.role}
                  key={i}
                  selected={user.role === data.role ? "selected" : null}
                >
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

export default Update;
