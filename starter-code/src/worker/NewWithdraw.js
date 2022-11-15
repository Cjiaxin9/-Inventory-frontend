import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";

import "../worker/worker.css";

const NewWithdraw = () => {
  const { register, handleSubmit, reset } = useForm();

  const [location, setlocation] = useState("");
  const [category, setcategory] = useState("");
  const [error, setError] = useState(null);

  const someDate = new Date();

  const date = someDate.setDate(someDate.getDate());
  // const defaultValue = new Date(date).toISOString();
  const defaultValue = new Date(date).toISOString().split("T")[0];

  // console.log(defaultValue);
  const [cdate, setcdate] = useState(defaultValue);
  const handledateChange = (event) => {
    setcdate(event.target.value);
  };

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

  // after submit press  send to backend
  const [withdrawidsave, setwithdrawidsave] = useState("");
  useEffect(() => {
    // console.log(data);
    const inputsrow = Object.keys(inputrowsdata).map(
      (key) => inputrowsdata[key]
    ); // make from object inside object to array

    inputsrow.map((oneInput) => {
      return sendOneInputToBackend(oneInput);
    });
  }, [withdrawidsave]);
  const sendOneInputToBackend = async (oneInput) => {
    // console.log(withdrawidsave); // withdraw_id
    const restable = await fetch(
      "http://127.0.0.1:5001/withdrawproduct/create",
      {
        method: "PUT",
        body: JSON.stringify({
          withdraw_id: withdrawidsave,
          product_name: oneInput.productName,
          Qty: oneInput.productQty,
          unit: oneInput.productUnit,
          remark: oneInput.productRemarks,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const datatable = await restable.json(); // return{status: 'ok', message: 'saved'} on the inspect - save in backend
    // console.log(datatable);
  };
  //submit button
  const [inputrowsdata, setinputrowsdata] = useState("");
  const onSubmit = async (data, e) => {
    setinputrowsdata(data);
    // console.log(location);
    // console.log(cdate);
    // console.log(category);
    if (location !== "" && category !== "" && cdate !== "") {
      e.preventDefault();
      let databody = {
        location: location,
        category: category,
        date: cdate,
      };
      const reswithdraw = await fetch("http://127.0.0.1:5001/withdraw/create", {
        method: "PUT",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datawithdraw = await reswithdraw.json();

      setwithdrawidsave(datawithdraw.rows[0].id);

      reset();
    } else {
      alert("Please insert correct information ");
    }
  };

  return (
    <div className="Newwithdraw">
      <h2> Withdraw page </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="date">
          <Label value="Date " className="fw-bold" />
          <input
            className="date"
            value={cdate}
            type="text"
            onChange={handledateChange}
          />
          <p />
          <Label value="Location " className="fw-bold" />
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
          <Label value="Category " className="fw-bold" />
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
        <Button className="add" onClick={() => handleAddRow()} type="button">
          + Add
        </Button>
        <p />

        <div className="container row w-100 d-flex justify-content-center">
          <div className="col-sm-6 px-4 fw-bold">
            <Label value="Product " />
          </div>
          <div className="col-sm-2 px-4 fw-bold">
            <Label value="Qty " />
          </div>
          <div className="col-sm-1 px-4 fw-bold ">
            <Label value="unit " />
          </div>
          <div className="col-sm-2 px-4 fw-bold ">
            <Label value="Remark " />
          </div>
        </div>
        {rowCount.map((data, index) => {
          return (
            <div
              className="container row w-100 d-flex justify-content-center"
              key={index}
            >
              <div className="col-sm-6 my-2 px-0">
                <select {...register(`${index}.productName`)}>
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
                <Input
                  type="number"
                  register={register}
                  inputName={`${index}.productQty`}
                />
              </div>
              <div className="col-sm-1 my-2  px-0 ms-2">
                <select {...register(`${index}.productUnit`)}>
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
              <div className="col-sm-2 my-2 px-0 ms-3">
                <Input
                  type="text"
                  register={register}
                  inputName={`${index}.productRemarks`}
                />
              </div>
            </div>
          );
        })}
        <Button className="btn-default" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewWithdraw;
