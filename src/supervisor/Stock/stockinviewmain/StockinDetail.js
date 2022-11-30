import React, { useEffect, useState } from "react";

import Label from "../../../common/Label";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "./Stockincard";
import MainCard from "./Stockinmaincard";
import "../../../worker/worker.css";

import { useNavigate } from "react-router-dom";

const StockinDetail = (props) => {
  const navigate = useNavigate();

  const [id, setId] = useState(props.siidfromview);
  const [postDetail, setPostDetail] = useState(null);
  const [postDetailTable, setPostDetailTable] = useState(null);
  const [error, setError] = useState(null);
  const [listdate, steListdate] = useState(props.siDatefromview);

  // to fetch

  const fetchPostDetail = async (url, url2) => {
    setError(null);
    setPostDetail(null);
    setPostDetailTable(null);

    try {
      const res = await fetch(url, {
        method: "Put",

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPostDetail(data.rows); // from withdraw
    } catch (err) {
      setError(err.message);
    }
    try {
      const restable = await fetch(url2, {
        method: "Put",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (restable.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const datatable = await restable.json();

      setPostDetailTable(datatable.rows); //from  product table
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const url = `https://inventorybackend-hz92.onrender.com/stockin/${id}`;
    const url2 = `https://inventorybackend-hz92.onrender.com/stockinproduct/${id}`;
    fetchPostDetail(url, url2);
  }, [id]);
  const someDate = new Date();
  const date = someDate.setDate(someDate.getDate());

  const todayDate = new Date(date).toDateString();

  //edit button

  const handleedit = (postDetailTable, postDetail) => {
    if (listdate != todayDate) {
      alert(
        `You cannot edit this page if the date is not today (${todayDate})`
      );
    } else {
      props.setSIDetailListTable(postDetailTable);
      props.setSIDetailList(postDetail);
      navigate("/edit_stockin_detail");
    }
  };

  //delete button
  let deleteall = false;
  const [postdeletelist, setpostdeletelist] = useState(null);
  const [postdeletetable, setpostdeletetable] = useState(null);
  const handleDelete = async (postDetail) => {
    let databody = {
      id: postDetail[0].id,
    };

    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/stockinproduct/delete",
      {
        method: "DELETE",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setpostdeletetable(data);
  };

  useEffect(async () => {
    let databody = {
      id: postDetail[0].id,
    };

    const res = await fetch(
      "https://inventorybackend-hz92.onrender.com/stockin/delete",
      {
        method: "DELETE",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setpostdeletelist(data);

    deleteall = true;
    if (deleteall === true) {
      //
      navigate("/view_stockin_main");
    }
  }, [postdeletetable]);

  //back button
  const handleback = () => {
    navigate(-1);
  };
  return (
    <div>
      <h2>Stock In Detail List</h2>
      <div className="container row w-100 d-flex justify-content-center">
        <MainCard
          className=" col-sm-3 fw-bold border border-secondary text-center"
          date="Date "
          company="Company"
          category="Category"
        />
        {postDetail &&
          postDetail.map((item, i) => {
            return (
              <React.Fragment>
                <MainCard
                  className="col-sm-3 border border-secondary text-center"
                  date={new Date(item.date).toDateString()}
                  company={item.company}
                  category={item.category}
                  key={i}
                />
              </React.Fragment>
            );
          })}

        <p></p>
        <Card
          className=" col-sm-3 fw-bold border border-secondary text-center"
          product_name="Product"
          Qty="Qty"
          unit="unit"
          remark="Remark"
        />
        {postDetailTable &&
          postDetailTable.map((item, i) => {
            return (
              <React.Fragment>
                <Card
                  className="col-sm-3 border border-secondary text-center"
                  product_name={item.product_name}
                  Qty={item.qty}
                  unit={item.unit}
                  remark={item.remark}
                  key={i}
                />
              </React.Fragment>
            );
          })}
        <Button
          className="buttonedit btn-default"
          type="button"
          onClick={() => handleedit(postDetailTable, postDetail)}
        >
          To Edit
        </Button>
        <Button
          className="buttonDelete btn-default"
          type="button"
          onClick={() => handleDelete(postDetail)}
        >
          Delete
        </Button>
        <Button
          className="buttonbackdetail btn-default"
          type="button"
          onClick={() => handleback()}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default StockinDetail;
