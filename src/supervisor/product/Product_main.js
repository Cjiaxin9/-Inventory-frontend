import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

import Search from "../Search";
import CardProduct from "./CardProduct";
import "./Product_main.css";

const Product_main = () => {
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
      product_name: userInput.toUpperCase(),
    };

    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/productlist/create",
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
  const [postallproductlist, setPostallproductlist] = useState("");
  const [error, setError] = useState(null);
  const fetchPostDetail = async (url) => {
    setError(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostallproductlist(data.productList.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url =
      "https://inventorybackend-hz92.onrender.com/productlist/allproductlist";
    fetchPostDetail(url);
  }, []);

  let linebutton = [];
  let productlistSelected = [];
  for (let i = 0; i < postallproductlist.length; i++) {
    if (postallproductlist[i].product_name.includes(query.toUpperCase())) {
      productlistSelected.push({
        product_name: postallproductlist[i].product_name,
      });
    } else if (
      postallproductlist[i].product_name.includes(query.toUpperCase()) == ""
    ) {
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

  if (productlistSelected) {
    lineItems = productlistSelected.map((item, i) => {
      return (
        <React.Fragment>
          <CardProduct
            className="box  col-sm-3 border border-secondary text-center"
            product_name={item.product_name}
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
    lineedit = prompt(`Product Name`, item.product_name);

    let databody = {
      newproduct_name: lineedit.toUpperCase(),
      product_name: item.product_name,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/productlist/update",
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
      product_name: item.product_name,
    };
    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/productlist/delete",
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
        <h2>Product Name List</h2>

        <Button
          className="buttonExit1"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>
        <Search
          placeholder="Product Name"
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hhandleClear={handleClear}
        />

        <div className="container row w-100 d-flex justify-content-center">
          <p></p>
          <CardProduct
            className=" box col-sm-3 fw-bold border border-secondary text-center"
            product_name="Product Name"
          />

          {lineItems}
          {linebutton}
          {lineedit}
        </div>
      </div>
    </div>
  );
};

export default Product_main;
