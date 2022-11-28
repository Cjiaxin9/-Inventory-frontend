import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const AllUser = (props) => {
  const navigate = useNavigate();
  const [postalluser, setPostalluser] = useState("");
  const [error, setError] = useState(null);

  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      // console.log("data.user.rows", data.user.rows);

      setPostalluser(data.user.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/users/allusers";
    fetchPostDetail(url);
  }, []);

  let lineItems = [];

  if (postalluser) {
    lineItems = postalluser.map((item) => {
      return (
        <React.Fragment>
          <UserCard
            className="col-sm-3 border border-secondary text-center"
            username={item.username}
            role={item.role}
          />
          <Button
            className="button"
            type="button"
            onClick={() => handleedit(item)}
          >
            edit
          </Button>
          <Button
            className="button1"
            type="button"
            onClick={() => handledelete(item)}
          >
            Delete
          </Button>
        </React.Fragment>
      );
    });
  }
  const deleteuser = false;
  const handleedit = (item) => {
    props.setAdminidfromview(item);
    navigate("/useredit");
  };

  const [postdeleteuser, setpostdeleteuser] = useState(null);
  const handledelete = async (item) => {
    console.log(item.id);
    let databody = {
      id: item.id,
    };
    const res = await fetch("http://127.0.0.1:5001/users/delete", {
      method: "DELETE",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.message == "delete successfully") {
      window.location.reload();
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="Newwithdraw ">
        <h1>All User</h1>
        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <UserCard
            className=" col-sm-3 fw-bold border border-secondary text-center"
            username="Username "
            role="Role"
          />
          {lineItems}
        </div>
      </div>
      <Button
        className="Button"
        input="Submit"
        type="submit"
        onClick={handleBack}
      >
        Back
      </Button>
    </div>
  );
};

export default AllUser;
