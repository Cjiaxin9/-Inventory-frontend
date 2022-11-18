import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "./Card";
import MainCard from "./MainCard";
import "../worker/worker.css";
import { useNavigate } from "react-router-dom";

const WithdrawRecord_main = (props) => {
  const navigate = useNavigate();
  const [datafromBD, setdatafromBD] = useState("");
  const [error, setError] = useState(null);

  const fetchdatafromDB = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setdatafromBD(data.withdraw.rows);
    } catch (err) {
      setError(err.message);
    }
  };
  const [detail, setdetail] = useState([]);
  useEffect(() => {
    const url = "http://127.0.0.1:5001/withdraw/allwithdraw";
    fetchdatafromDB(url);
  }, []);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < datafromBD.length; i++) {
      array.push({
        date: new Date(datafromBD[i].date).toDateString(),
        location: datafromBD[i].location,
        category: datafromBD[i].category,
        id: datafromBD[i].id,
      });
    }
    setdetail(array);
  }, [datafromBD]);

  const handleview = (item) => {
    props.setWDidfromview(item.id);
    props.setWDDatefromview(item.date);
    navigate("/view_withdraw_detail");
  };

  const handleback = () => {
    navigate(-1);
  };
  return (
    <div className="Newwithdraw ">
      <h2>Withdraw list</h2>
      <Button
        className="buttonbackrecord2"
        type="button"
        onClick={() => handleback()}
      >
        Back
      </Button>
      <div className="container row w-100 d-flex justify-content-center">
        <p></p>
        <MainCard
          className=" col-sm-3 fw-bold border border-secondary text-center"
          date="Date "
          location="Location"
          category="Category"
        />

        {detail.map((item) => {
          return (
            <React.Fragment>
              <MainCard
                className="col-sm-3 border border-secondary text-center"
                date={item.date}
                location={item.location}
                category={item.category}
              />
              <Button
                className="button3"
                type="button"
                onClick={() => handleview(item)}
              >
                View
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WithdrawRecord_main;
