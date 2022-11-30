import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Search from "../Search";
import CardCategory from "./CardCategory";
import "./Category_main.css";

const Category_main = () => {
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
      category: userInput.toUpperCase(),
    };
    // console.log(databody);
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/category/create",
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

  // fetch all category
  const [postallCategory, setPostallCategory] = useState("");
  const [error, setError] = useState(null);
  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      // console.log("data.user.rows", data.category.rows);

      setPostallCategory(data.category.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url =
      "https://inventorybackend-hz92.onrender.com/category/allcategory";
    fetchPostDetail(url);
  }, []);

  let linebutton = [];
  let categorySelected = [];
  for (let i = 0; i < postallCategory.length; i++) {
    if (postallCategory[i].category.includes(query.toUpperCase())) {
      categorySelected.push({
        category: postallCategory[i].category,
      });
    } else if (
      postallCategory[i].category.includes(query.toUpperCase()) == ""
    ) {
      linebutton = (
        <Button
          className="buttonnew"
          type="button"
          onClick={() => handleAdd(userInput)}
        >
          Add new Category
        </Button>
      );
    }
  }

  let lineItems = [];

  if (categorySelected) {
    lineItems = categorySelected.map((item, i) => {
      return (
        <React.Fragment>
          <CardCategory
            className="box  col-sm-3 border border-secondary text-center"
            category={item.category}
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
    lineedit = prompt(`Category`, item.category);

    let databody = {
      newcategory: lineedit.toUpperCase(),
      category: item.category,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/category/update",
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

  const [postdeleteCategory, setpostdeletecategory] = useState(null);
  const handledelete = async (item) => {
    let databody = {
      category: item.category,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/category/delete",
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
      <div className="category ">
        <h2>Category List</h2>

        <Button
          className="buttonExit1"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>

        <Search
          placeholder="Category"
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
        {lineedit}
        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <CardCategory
            className=" box col-sm-3 fw-bold border border-secondary text-center"
            category="Category "
          />

          {lineItems}
          {linebutton}
        </div>
      </div>
    </div>
  );
};

export default Category_main;
