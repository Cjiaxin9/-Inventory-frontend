import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

import Search from "../Search";
import CardCompany from "./CardCompany";
import "./Company_main.css";

const Company_main = () => {
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
      company: userInput.toUpperCase(),
    };
    // console.log(databody);
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/company/create",
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
  const [postallCompany, setPostallCompany] = useState("");
  const [error, setError] = useState(null);
  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostallCompany(data.company.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "https://inventorybackend-hz92.onrender.com/company/allcompany";
    fetchPostDetail(url);
  }, []);

  let linebutton = [];
  let companySelected = [];
  for (let i = 0; i < postallCompany.length; i++) {
    if (postallCompany[i].company.includes(query.toUpperCase())) {
      companySelected.push({
        company: postallCompany[i].company,
      });
    } else if (postallCompany[i].company.includes(query.toUpperCase()) == "") {
      linebutton = (
        <Button
          className="buttonnew"
          type="button"
          onClick={() => handleAdd(userInput)}
        >
          Add new Company
        </Button>
      );
    }
  }

  let lineItems = [];

  if (companySelected) {
    lineItems = companySelected.map((item, i) => {
      return (
        <React.Fragment>
          <CardCompany
            className="box  col-sm-3 border border-secondary text-center"
            company={item.company}
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
    lineedit = prompt(`company`, item.company);

    let databody = {
      newcompany: lineedit.toUpperCase(),
      company: item.company,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/company/update",
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

  const [postdeletecompany, setpostdeletecompany] = useState(null);
  const handledelete = async (item) => {
    let databody = {
      company: item.company,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/company/delete",
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
      <div className="company">
        <h2>Company List</h2>

        <Button
          className="buttonExit1"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>
        <Search
          placeholder="Company"
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hhandleClear={handleClear}
        />

        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <CardCompany
            className=" box col-sm-3 fw-bold border border-secondary text-center"
            company="Company "
          />

          {lineItems}
          {linebutton}
          {lineedit}
        </div>
      </div>
    </div>
  );
};

export default Company_main;
