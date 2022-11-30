import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../../../common/Label";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import { useNavigate } from "react-router-dom";
// import "../worker/worker.css";

const StockinEdit = (props) => {
  const navigate = useNavigate();
  const [stockinlist, setstockinlist] = useState(props.siDetailList);
  const [stockinlistproduct, setstockinlistproduct] = useState(
    props.siDetailListTable
  );

  const [company, setcompany] = useState(stockinlist[0].company);
  const [category, setcategory] = useState(stockinlist[0].category);
  const [error, setError] = useState(null);
  const id = stockinlist[0].id;

  const defaultValues = {};
  for (let i = 0; i < stockinlistproduct.length; i++) {
    defaultValues[`${i}`] = {};
    defaultValues[`${i}`].productName = stockinlistproduct[i].product_name;
    defaultValues[`${i}`].productQty = stockinlistproduct[i].qty;
    defaultValues[`${i}`].productUnit = stockinlistproduct[i].unit;
    defaultValues[`${i}`].productRemarks = stockinlistproduct[i].remark;
    defaultValues[`${i}`].id = stockinlistproduct[i].id;
  }
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const someDate = new Date();

  const date = someDate.setDate(someDate.getDate());

  const today = new Date(date).toDateString();

  const [cdate, setcdate] = useState(
    new Date(stockinlist[0].date).toDateString()
  );
  const handledateChange = (event) => {
    setcdate(event.target.value);
  };

  //company dropdown list
  const [postcompany, setPostcompany] = useState(null);
  const fetchPostcompany = async (url) => {
    setError(null);
    setPostcompany(null);

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const datacompany = await res.json();

      setPostcompany({
        company: datacompany.company.rows,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = "https://inventorybackend-hz92.onrender.com/company/allcompany";
    fetchPostcompany(url);
  }, []);

  const handlecompanyChange = (event) => {
    setcompany(event.target.value);
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
    const url =
      "https://inventorybackend-hz92.onrender.com/category/allcategory";
    fetchPostCategory(url);
  }, []);

  const handlecategoryChange = (event) => {
    setcategory(event.target.value);
  };

  // Create a state for the amount of rows you want to view
  const [rowCount, setRowCount] = useState(stockinlistproduct);

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
    const url =
      "https://inventorybackend-hz92.onrender.com/productlist/allproductlist";
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
    const url = "https://inventorybackend-hz92.onrender.com/unit/allunit";
    fetchPostUnit(url);
  }, []);

  // after submit press  send to backend
  const [stockinidsave, setstockinidsave] = useState("");
  useEffect(() => {
    const inputsrow = Object.keys(inputrowsdata).map(
      (key) => inputrowsdata[key]
    ); // make from object inside object to array

    inputsrow.map((oneInput) => {
      return sendOneInputToBackend(oneInput);
    });
  }, [stockinidsave]);

  const sendOneInputToBackend = async (oneInput) => {
    // console.log(oneInput);
    const restable = await fetch(
      "https://inventorybackend-hz92.onrender.com/stockinproduct/update",
      {
        method: "PATCH",
        body: JSON.stringify({
          stockin_id: stockinidsave,
          product_name: oneInput.productName,
          Qty: oneInput.productQty,
          unit: oneInput.productUnit,
          remark: oneInput.productRemarks,
          id: oneInput.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const datatable = await restable.json();
    if (datatable.message == "updated successfully") {
      navigate("/view_stockin_main"); //to change
    }
  };
  //submit button
  const [inputrowsdata, setinputrowsdata] = useState("");
  const onSubmit = async (data, e) => {
    setinputrowsdata(data);
    if (company !== "" && category !== "" && cdate !== "" && id !== "") {
      e.preventDefault();
      let databody = {
        company: company,
        category: category,
        date: cdate,
        id: id,
      };
      const resstockin = await fetch(
        "https://inventorybackend-hz92.onrender.com/stockin/update",
        {
          method: "PATCH",
          body: JSON.stringify(databody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const datastockin = await resstockin.json();

      setstockinidsave(datastockin.updatewstockinDetailsResult.rows[0].id);
      //   console.log(datastockin.updatewstockinDetailsResult.rows[0].id);
      reset();
    } else {
      alert("Please insert correct information ");
    }
  };
  const handleback = () => {
    navigate(-1);
  };
  return (
    <div className="Newwithdraw">
      <h2> Stock in page - edit </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="date">
          <Label value="Date " className="fw-bold" />
          <input
            className="date"
            type="text"
            onChange={handledateChange}
            defaultValue={new Date(stockinlist[0].date).toDateString()}
          />
          <p />
          <Label value="Company " className="fw-bold" />
          <select onChange={handlecompanyChange}>
            {postcompany &&
              postcompany.company.map((data, i) => {
                return (
                  <option
                    value={data.company}
                    key={i}
                    selected={
                      stockinlist[0].company === data.company
                        ? "selected"
                        : null
                    }
                  >
                    {data.company}
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
                  <option
                    value={data.category}
                    key={i}
                    selected={
                      stockinlist[0].category === data.category
                        ? "selected"
                        : null
                    }
                  >
                    {data.category}
                  </option>
                );
              })}
          </select>
        </div>
        <p />
        {/*<Button className="add" onClick={() => handleAddRow()} type="button">
            + Add
              </Button>*/}
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
                        <option
                          value={data.product_name}
                          key={i}
                          selected={
                            defaultValues[`${index}`].productName ===
                            data.product_name
                              ? "selected"
                              : null
                          }
                        >
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
                        <option
                          value={data.unit}
                          key={i}
                          selected={
                            defaultValues[`${index}`].productUnit === data.unit
                              ? "selected"
                              : null
                          }
                        >
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
          Submit Edit
        </Button>
      </form>
      <Button
        className="buttonExit1"
        type="button"
        onClick={() => handleback()}
      >
        Exit without save
      </Button>
    </div>
  );
};

export default StockinEdit;
