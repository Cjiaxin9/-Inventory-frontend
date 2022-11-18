import React, { useEffect, useState } from "react";
import Card from "./Card";
import MainCard from "./MainCard";
import WithdrawRecord_main from "./WithdrawRecord_main";
import "../worker/worker.css";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const ViewWithdrawDetail = (props) => {
  const navigate = useNavigate();

  const [id, setId] = useState(props.wdidfromview);
  const [postDetail, setPostDetail] = useState(null);
  const [postDetailTable, setPostDetailTable] = useState(null);
  const [error, setError] = useState(null);
  const [listdate, steListdate] = useState(props.wdDatefromview);
  console.log(listdate);
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

      setPostDetailTable(datatable.rows); //from withdraw product table
    } catch (err) {
      setError(err.message);
    }
  };
  // console.log(postDetail);
  useEffect(() => {
    const url = `http://127.0.0.1:5001/withdraw/${id}`;
    const url2 = `http://127.0.0.1:5001/withdrawproduct/${id}`;
    fetchPostDetail(url, url2);
  }, [id]);
  const someDate = new Date();
  const date = someDate.setDate(someDate.getDate());
  // const defaultValue = new Date(date).toISOString();
  const todayDate = new Date(date).toISOString().split("T")[0];

  //edit button
  const handleedit = (postDetailTable, postDetail) => {
    props.setWDDetailListTable(postDetailTable);
    props.setWDDetailList(postDetail);
    navigate("/edit_withdraw_detail");

    // if (listdate != todayDate) {
    //   alert(
    //     `You cannot edit this page if the date is not today (${todayDate})`
    //   );
    // } else {
    //   props.setWDDetailListTable(postDetailTable);
    //   props.setWDDetailList(postDetail);
    //   navigate("/edit_withdraw_detail");
    // }
  };
  //delete button
  let deleteall = false;
  const [postdeletelist, setpostdeletelist] = useState(null);
  const [postdeletetable, setpostdeletetable] = useState(null);
  const handleDelete = async (postDetail) => {
    let databody = {
      id: postDetail[0].id,
    };

    const res = await fetch("http://127.0.0.1:5001/withdrawproduct/delete", {
      method: "DELETE",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setpostdeletetable(data);
  };
  useEffect(async () => {
    let databody = {
      id: postDetail[0].id,
    };

    const res = await fetch("http://127.0.0.1:5001/withdraw/delete", {
      method: "DELETE",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setpostdeletelist(data);

    deleteall = true;
    if (deleteall === true) {
      //
      navigate("/withdrawMain"); //to be change
    }
  }, [postdeletetable]);

  //back button
  const handleback = () => {
    navigate(-1);
  };
  return (
    <div>
      <h2>Withdraw Detail List</h2>
      <div className="container row w-100 d-flex justify-content-center">
        <MainCard
          className=" col-sm-3 fw-bold border border-secondary text-center"
          date="Date "
          location="Location"
          category="Category"
        />
        {postDetail &&
          postDetail.map((item, i) => {
            return (
              <React.Fragment>
                <MainCard
                  className="col-sm-3 border border-secondary text-center"
                  date={new Date(item.date).toDateString()}
                  location={item.location}
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

export default ViewWithdrawDetail;
