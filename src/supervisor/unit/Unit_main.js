import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

import Search from "../Search";
import CardUnit from "./CardUnit";
import "./Unit_main.css";

const Unit_main = () => {
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
      unit: userInput.toUpperCase(),
    };

    const res = await fetch("http://127.0.0.1:5001/unit/create", {
      method: "PUT",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.message == "saved") {
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  // fetch all
  const [postallunit, setPostallunit] = useState("");
  const [error, setError] = useState(null);
  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostallunit(data.unit.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/unit/allunit";
    fetchPostDetail(url);
  }, []);

  let linebutton = [];
  let unitSelected = [];
  for (let i = 0; i < postallunit.length; i++) {
    if (postallunit[i].unit.includes(query.toUpperCase())) {
      unitSelected.push({
        unit: postallunit[i].unit,
      });
    } else if (postallunit[i].unit.includes(query.toUpperCase()) == "") {
      linebutton = (
        <Button
          className="buttonnew"
          type="button"
          onClick={() => handleAdd(userInput)}
        >
          Add new Unit
        </Button>
      );
    }
  }

  let lineItems = [];

  if (unitSelected) {
    lineItems = unitSelected.map((item, i) => {
      return (
        <React.Fragment>
          <CardUnit
            className="box  col-sm-3 border border-secondary text-center"
            unit={item.unit}
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
    lineedit = prompt(`Unit`, item.unit);

    let databody = {
      newunit: lineedit.toUpperCase(),
      unit: item.unit,
    };
    const res = await fetch("http://127.0.0.1:5001/unit/update", {
      method: "PATCH",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message == "updated successfully") {
      window.location.reload();
    }
  };

  const [postdeletelocation, setpostdeletelocation] = useState(null);
  const handledelete = async (item) => {
    // console.log(item.location);
    let databody = {
      unit: item.unit,
    };
    const res = await fetch("http://127.0.0.1:5001/unit/delete", {
      method: "DELETE",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.message == "deleted") {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="location">
        <h2>Unit List</h2>

        <Button
          className="buttonExit1"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>
        <Search
          placeholder="Unit"
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hhandleClear={handleClear}
        />

        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <CardUnit
            className=" box col-sm-3 fw-bold border border-secondary text-center"
            unit="Unit "
          />

          {lineItems}
          {linebutton}
          {lineedit}
        </div>
      </div>
    </div>
  );
};

export default Unit_main;
