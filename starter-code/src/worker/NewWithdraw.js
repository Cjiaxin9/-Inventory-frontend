import React, { useEffect, useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";

import "../worker/worker.css";

const NewWithdraw = () => {
  const [location, setlocation] = useState("");
  const [category, setcategory] = useState("");
  const [error, setError] = useState(null);

  const someDate = new Date();

  const date = someDate.setDate(someDate.getDate());
  // const defaultValue = new Date(date).toISOString();
  const defaultValue = new Date(date).toISOString().split("T")[0];
  // console.log(someDate); // today date
  // console.log(defaultValue);
  const [cdate, setcdate] = useState(defaultValue);
  const handledateChange = (event) => {
    setcdate(event.target.value);
  };
  console.log(cdate);
  //location dropdown list
  const [postLocation, setPostLocation] = useState(null);

  const fetchPostLocation = async (url) => {
    setError(null);
    setPostLocation(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostLocation({
        location: data.location.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/location/alllocation";
    fetchPostLocation(url);
  }, []);

  // console.log({ post_result: postLocation });
  const handlelocationChange = (event) => {
    setlocation(event.target.value);
  };

  //location Category list
  const [postCategory, setPostCategory] = useState(null);

  const fetchPostCategory = async (url) => {
    setError(null);
    setPostCategory(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const dataCategory = await res.json();

      setPostCategory({
        category: dataCategory.category.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/category/allcategory";
    fetchPostCategory(url);
  }, []);

  const handlecategoryChange = (event) => {
    setcategory(event.target.value);
  };

  // Create a state for the amount of rows you want to view
  const [rowCount, setRowCount] = useState([]);
  const handleAddRow = () => {
    const inputBox = [...rowCount, []];
    setRowCount(inputBox);
  };
  //   const handleChange = (onChangeValue, i) => {
  //     const inputdata = [...rowCount];
  //     inputdata[i] = onChangeValue.target.value;
  //     setRowCount(inputdata);
  //   };

  //product name

  const [postProduct, setPostProduct] = useState(null);

  const fetchPostProduct = async (url) => {
    setError(null);
    setPostProduct(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const dataProduct = await res.json();

      setPostProduct({
        product: dataProduct.productList.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/productlist/allproductlist";
    fetchPostProduct(url);
  }, []);

  const [product_name, setProduct_name] = useState("");
  const handleProductNameChange = (event) => {
    setProduct_name(event.target.value);
  };

  //Qty
  const [qty, setQty] = useState("");

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };
  // const handleQtyChange = (onChangeValue, i) => {
  //   // const inputQty = [...rowCount];
  //   // inputQty[i] = onChangeValue.target.value;
  //   // setQty(inputQty);
  // };
  // console.log(qty);

  //unit

  const [postUnit, setPostUnit] = useState(null);

  const fetchPostUnit = async (url) => {
    setError(null);
    setPostUnit(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const dataUnit = await res.json();

      setPostUnit({
        unit: dataUnit.unit.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:5001/unit/allunit";
    fetchPostUnit(url);
  }, []);
  const [unit, setUnit] = useState("");
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  // const handleUnitChange = (onChangeValue, i) => {
  //   const inputUnit = [...rowCount];
  //   inputUnit[i] = onChangeValue.target.value;
  //   setUnit(inputUnit);
  // };
  // console.log(unit);

  //remark
  const [remark, setRemark] = useState("");
  const handleRemarkChange = (onChangeValue, i) => {
    const inputRemark = [...rowCount];
    inputRemark[i] = onChangeValue.target.value;
    setRemark(inputRemark);
  };
  // console.log(remark);

  //submit button
  const handleSubmit = async (e) => {
    console.log(location);
    console.log(cdate);
    console.log(category);
    if (location !== "" && category !== "" && cdate !== "") {
      e.preventDefault();
      let databody = {
        location: location,
        category: category,
        date: cdate,
      };
      const res = await fetch("http://127.0.0.1:5001/withdraw/create", {
        method: "PUT",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
    } else {
      alert("Please insert correct information ");
    }

    // save the table
  };

  return (
    <div className="Newwithdraw">
      <h2> Withdraw page </h2>
      <div className="date">
        <Label value="Date " />
        <Input
          className="date"
          value={cdate}
          type="text"
          onChange={handledateChange}
        />
        <p />
        <Label value="Location " />
        <select onChange={handlelocationChange}>
          {postLocation &&
            postLocation.location.map((data, i) => {
              return (
                <option value={data.location} key={i}>
                  {data.location}
                </option>
              );
            })}
        </select>
        <p />
        <Label value="Category " />
        <select onChange={handlecategoryChange}>
          {postCategory &&
            postCategory.category.map((data, i) => {
              return (
                <option value={data.category} key={i}>
                  {data.category}
                </option>
              );
            })}
        </select>
      </div>
      <p />
      <Button
        className="add"
        onClick={() => handleAddRow()}
        input="+ Add"
      ></Button>
      <p />
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-sm-4 px-4">
          <Label value="product " />
        </div>
        <div className="col-sm-2 px-4">
          <Label value="Qty " />
        </div>
        <div className="col-sm-1 px-4">
          <Label value="unit " />
        </div>
        <div className="col-sm-2 px-4">
          <Label value="remark " />
        </div>
      </div>
      {rowCount.map((data, i) => {
        return (
          <div className="row w-100 d-flex justify-content-center">
            <div className="col-sm-4 my-2 px-0">
              <select onChange={handleProductNameChange}>
                {postProduct &&
                  postProduct.product.map((data, i) => {
                    return (
                      <option value={data.product_name} key={i}>
                        {data.product_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-sm-2 my-2 px-0">
              <Input onChange={(e) => handleQtyChange(e, i)} />
            </div>
            <div className="col-sm-1 my-2  px-0">
              <select onChange={handleUnitChange}>
                {postUnit &&
                  postUnit.unit.map((data, i) => {
                    return (
                      <option value={data.unit} key={i}>
                        {data.unit}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-sm-2 my-2 px-0">
              <Input onChange={(e) => handleRemarkChange(e, i)} />
            </div>
          </div>
        );
      })}

      <Button
        className="btn-default"
        input="Submit"
        type="submit"
        onClick={handleSubmit}
      ></Button>
    </div>
  );
};

export default NewWithdraw;
