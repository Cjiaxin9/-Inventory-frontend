import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

import Search from "../Search";
import CardLocation from "./CardLocation";
import "./Location_main.css";

const Location_main = () => {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/Supervisormainpage");
  };
  //input box
  const [query, setQuery] = useState(""); //( being searched)
  const [userInput, setUserInput] = useState(""); // User Input

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(userInput);
  };
  const handleClear = (event) => {
    setQuery("");
  };

  const handleAdd = async (event) => {
    let databody = {
      location: userInput.toUpperCase(),
    };

    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/location/create",
      {
        method: "PUT",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data.message == "saved") {
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  // fetch all
  const [postalllocation, setPostalllocation] = useState("");
  const [error, setError] = useState(null);
  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostalllocation(data.location.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url =
      "https://inventorybackend-hz92.onrender.com/location/alllocation";
    fetchPostDetail(url);
  }, []);

  let linebutton = [];
  let locationSelected = [];
  for (let i = 0; i < postalllocation.length; i++) {
    if (postalllocation[i].location.includes(query.toUpperCase())) {
      locationSelected.push({
        location: postalllocation[i].location,
      });
    } else if (
      postalllocation[i].location.includes(query.toUpperCase()) == ""
    ) {
      linebutton = (
        <Button
          className="buttonnew"
          type="button"
          onClick={() => handleAdd(userInput)}
        >
          Add new Location
        </Button>
      );
    }
  }

  let lineItems = [];

  if (locationSelected) {
    lineItems = locationSelected.map((item, i) => {
      return (
        <React.Fragment>
          <CardLocation
            className="box  col-sm-3 border border-secondary text-center"
            location={item.location}
            key={i}
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

  const deletecategory = false;

  let lineedit = [];
  const handleedit = async (item) => {
    lineedit = prompt(`Location`, item.location);

    let databody = {
      newlocation: lineedit.toUpperCase(),
      location: item.location,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/location/update",
      {
        method: "PATCH",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.message == "updated successfully") {
      window.location.reload();
    }
  };

  const [postdeletelocation, setpostdeletelocation] = useState(null);
  const handledelete = async (item) => {
    let databody = {
      location: item.location,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/location/delete",
      {
        method: "DELETE",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.message == "deleted") {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="location">
        <h2>Location List</h2>

        <Button
          className="buttonExit1"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>
        <Search
          placeholder="Location"
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hhandleClear={handleClear}
        />

        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <CardLocation
            className=" box col-sm-3 fw-bold border border-secondary text-center"
            location="Location "
          />

          {lineItems}
          {linebutton}
          {lineedit}
        </div>
      </div>
    </div>
  );
};

export default Location_main;
