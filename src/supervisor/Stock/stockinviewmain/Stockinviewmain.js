import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import Label from "../../../common/Label";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "./Stockincard";
import MainCard from "./Stockinmaincard";
import "../../../worker/worker.css";
import { useNavigate } from "react-router-dom";

const Stockinviewmain = (props) => {
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

      setdatafromBD(data.stockin.rows);
    } catch (err) {
      setError(err.message);
    }
  };
  const [detail, setdetail] = useState([]);
  useEffect(() => {
    const url = "https://inventorybackend-hz92.onrender.com/stockin/allstockin";
    fetchdatafromDB(url);
  }, []);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < datafromBD.length; i++) {
      array.push({
        date: new Date(datafromBD[i].date).toDateString(), // to interpreted in the local timezone in English. (Mon Jun 28 1993)
        company: datafromBD[i].company,
        category: datafromBD[i].category,
        id: datafromBD[i].id,
      });
    }
    setdetail(array);
  }, [datafromBD]);

  const handleview = (item) => {
    props.setSIidfromview(item.id);
    props.setSIDatefromview(item.date);
    navigate("/view_stockin_detail"); // to change
  };

  const handleback = () => {
    navigate("/view_stock_main");
  };
  return (
    <div className="Newwithdraw ">
      <h2>Stock in list</h2>
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
          company="Company"
          category="Category"
        />

        {detail.map((item) => {
          return (
            <React.Fragment>
              <MainCard
                className="col-sm-3 border border-secondary text-center"
                date={item.date}
                company={item.company}
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

export default Stockinviewmain;
